from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token,
                                create_refresh_token)

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt=JWTManager()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    status = db.Column(db.Integer)
    last_logged_in = db.Column(db.String(16))
    password_hash = db.Column(db.String(128))

    def authenticate(self, password):
        if (check_password_hash(self.password_hash, password) == True):
                access_token = create_access_token(identity=self.password_hash)
                refresh_token = create_refresh_token(identity=self.password_hash)
                return (True, {
                    'username': self.username,
                    'id': self.id,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                })
        return (False, {})
    

class Movie(db.Model):
    __tablename__ = 'movie'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, unique=True, index = True)

class UserToWatch(db.Model):
    __tablename__ = 'usertowatch'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    user = db.relationship('User', foreign_keys=[user_id])
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable = False)
    movie = db.relationship('Movie', foreign_keys=[movie_id])

