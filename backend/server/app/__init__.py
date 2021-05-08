from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import redis


#redis_client = redis.Redis(host='localhost', port = 6379, db = 0)

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    CORS(app)

    #usually, we initalize from library_registration (see below), but db belongs to models so lets go with that
    from .models import db
    db.init_app(app)

    #initializing third party libraries here with the app, cleaner dependancy chain this way
    from .library_registration import socketio, migrate, jwt
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="http://localhost:3000")

    #registering blueprints begins here
    from .blueprints.Auth_Service.auth_service_blueprint import auth_service_blueprint
    app.register_blueprint(auth_service_blueprint)

    from .blueprints.User_Service.user_service_movie_manager import user_service_movie_manager
    app.register_blueprint(user_service_movie_manager)

    from .blueprints.User_Service.profile_service_blueprint import profile_service_blueprint
    app.register_blueprint(profile_service_blueprint)

    from .blueprints.Movie_Service.movie_service_blueprint import movie_service_blueprint
    app.register_blueprint(movie_service_blueprint)
    
    #Websocket Blueprint
    from .WS.ws_handler import ws_handler
    app.register_blueprint(ws_handler)

    return app


app = create_app(Config)
