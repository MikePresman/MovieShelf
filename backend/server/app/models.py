from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token,
                                create_refresh_token)

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    status = db.Column(db.Integer)
    last_logged_in = db.Column(db.String(16))
    password_hash = db.Column(db.String(128))
    avatar = db.Column(db.String(123))

    def authenticate(self, password):
        if (check_password_hash(self.password_hash, password) == True):
                access_token = create_access_token(identity=self.id) #is id because easier to reference id back from get_jwt_identity()
                refresh_token = create_refresh_token(identity=self.id)
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
    user_id = db.Column(db.Integer, nullable = False)
    movie_id = db.Column(db.Integer, nullable = False)
    
class MovieComment(db.Model):
    __tablename__ =  'moviecomment'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable = False)
    movie_id = db.Column(db.Integer, nullable = False)
    comment = db.Column(db.Text, nullable = False)
    date_posted = db.Column(db.String(32), nullable = False)
    up_votes = db.Column(db.Integer, nullable = False, default = 0)

class MovieCommentsLike(db.Model):
    __tablename__ =  "moviecommentslike"
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, nullable = False)
    comment_liked_by_user_id = db.Column(db.Integer, nullable = False)
    


