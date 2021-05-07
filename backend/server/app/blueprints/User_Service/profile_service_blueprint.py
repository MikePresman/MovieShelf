from flask import Blueprint, make_response, request
from jsonschema import validate
from flask_jwt_extended import (create_access_token,
                                create_refresh_token, get_jwt_identity, jwt_required, get_jwt)

profile_service_blueprint = Blueprint('profile_service_blueprint', __name__)
from app.models import Movie, UserToWatch, db, User
from .user_service_schema import set_avatar_schema

@profile_service_blueprint.route("/get-avatar", methods = ["GET"])
@jwt_required()
def get_avatar():
    profile = User.query.filter_by(id = get_jwt_identity()).first()
    print(profile.avatar)
    if (profile.avatar == None):
        return {"avatar": "None"}, 200
    return {"avatar": profile.avatar}, 200


@profile_service_blueprint.route("/set-avatar", methods = ["POST"])
@jwt_required()
def set_avatar():
    try:
        validate(request.json, schema = set_avatar_schema)
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 412
        
    seed = request.json["seed"]

    profile = User.query.filter_by(id = get_jwt_identity()).first()
    profile.avatar = seed
    db.session.commit()
    return {"Success": 200}, 200