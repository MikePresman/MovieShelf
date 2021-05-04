from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import redis

redis_client = redis.Redis(host='localhost', port = 6379, db = 0)

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    CORS(app)

    from .models import db, migrate, jwt
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    #registering blueprints begins here
    from .blueprints.Auth_Service.auth_service_blueprint import auth_service_blueprint
    app.register_blueprint(auth_service_blueprint)

    #try and initalize redis, if it's offline then we'll still run without it :)
    #note, because we are allowing such flexibility, wherever we use redis calls we have to be safe
    

    
    redis_client.set('foo', 'bar')
    
    
    return app



app = create_app(Config)



