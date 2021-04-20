from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


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

    return app



app = create_app(Config)


