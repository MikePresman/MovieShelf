import os
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
	SECRET_KEY = os.environ.get('SECRET_KEY') or os.urandom(16)
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
            'postgresql:///movie_app'
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	MAIL_SERVER = 'smtp.gmail.com'
	MAIL_PORT = 587
	MAIL_USE_TLS = True
	MAIL_USE_SSL = False
	MAIL_USERNAME = ''
	MAIL_PASSWORD = ''
	JWT_SECRET_KEY = "super_secret"
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=1)