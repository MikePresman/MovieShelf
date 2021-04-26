from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token,
                                create_refresh_token,
                                jwt_required,
                                set_access_cookies,
                                unset_jwt_cookies)

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
    date_registered = db.Column(db.Integer)
    last_logged_in = db.Column(db.String(16))
    password_hash = db.Column(db.String(128))

    @classmethod
    def authenticate(self, password):
        if (check_password_hash(self.password_hash, password) == True):
                access_token = create_access_token(identity=self.password_hash)
                refresh_token = create_refresh_token(identity=self.password_hash)
                return (True, {
                    'username': self.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                })
        return (False, {})




#https://stackoverflow.com/questions/39176237/how-do-i-store-jwt-and-send-them-with-every-request-using-react
#https://medium.com/@riken.mehta/full-stack-tutorial-3-flask-jwt-e759d2ee5727 - user_schema
#https://medium.com/@monkov/react-using-axios-interceptor-for-token-refreshing-1477a4d5fc26
