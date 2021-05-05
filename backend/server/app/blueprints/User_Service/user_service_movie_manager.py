from flask import Blueprint, make_response, request
from jsonschema import validate
from flask_jwt_extended import (create_access_token,
                                create_refresh_token, get_jwt_identity, jwt_required, get_jwt)

user_service_movie_manager = Blueprint('user_service_movie_manager', __name__)


@user_service_movie_manager.route("/add-to-watch", methods = ["POST"])
def add_to_watch():
    print(request.json)
    return {"Test": "OK"}, 200