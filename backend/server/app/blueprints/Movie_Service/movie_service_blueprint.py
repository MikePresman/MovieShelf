from flask import Blueprint, make_response, request
from jsonschema import validate
from flask_jwt_extended import (create_access_token,
                                create_refresh_token, get_jwt_identity, jwt_required, get_jwt)

movie_service_blueprint = Blueprint('movie_service_blueprint', __name__)
from app.models import Movie, UserToWatch, db, User, MovieComment
from .movie_service_schema import submit_movie_comment_schema, get_movie_comments_schema

from datetime import datetime

@movie_service_blueprint.route("/set-comment", methods = ["POST"])
@jwt_required()
def set_comment():
    print(request.json)
    try:
        validate(request.json, schema = submit_movie_comment_schema)
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 412
    movieID = request.json['movieID']
    comment = request.json['comment']
    now = str(datetime.now().date())

    try:
        new_comment = MovieComment(user_id = get_jwt_identity(), movie_id = int(movieID), comment = comment, date_posted = now)
        db.session.add(new_comment)
        db.session.commit()
    except Exception as e:
        print(e)
        return {"Failure": 500}, 500
    
    return {"Success": 200}, 200


@movie_service_blueprint.route("/get-comments", methods = ["POST"])
@jwt_required()
def get_comments():
    try:
        validate(request.json, schema = get_movie_comments_schema)
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 412

    movieID = request.json['movieID']
    comments = MovieComment.query.filter_by(movie_id = movieID).all()
    response_payload = []
    key_counter = 0
    for comment in comments:
        user = User.query.filter_by(id = comment.user_id).first()
        response_payload.append({"commentText": comment.comment, "datePosted": comment.date_posted, "up_votes": comment.up_votes, "userPosted": user.username, "avatar": user.avatar, "key": key_counter})
        key_counter+=1
    return {"payload": response_payload}, 200