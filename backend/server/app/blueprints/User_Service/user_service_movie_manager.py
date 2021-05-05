from flask import Blueprint, make_response, request
from jsonschema import validate
from flask_jwt_extended import (create_access_token,
                                create_refresh_token, get_jwt_identity, jwt_required, get_jwt)

user_service_movie_manager = Blueprint('user_service_movie_manager', __name__)

from .user_service_schema import new_favourite_schema 
from app.models import Movie, UserToWatch, db, User

@user_service_movie_manager.route("/add-to-watch", methods = ["POST"])
@jwt_required()
def add_to_watch():
    try:
        validate(request.json, schema = new_favourite_schema)
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 412
    
    movie_id = int(request.json["movieID"]) #cast to int since DB has int type
    username = get_jwt_identity()

    #adding movie if it doesn't exist
    movie = Movie.query.filter_by(movie_id = movie_id).first()
    if (movie == None):
        movie = Movie(movie_id = movie_id)
        db.session.add(movie)
        db.session.commit()
    
    user_id_query = User.query.filter_by(username = username).first()

    new_to_watch = UserToWatch(user_id = user_id_query.id, movie_id = int(movie_id))
    db.session.add(new_to_watch)

    db.session.commit()
    return {"Success": 200}, 200



