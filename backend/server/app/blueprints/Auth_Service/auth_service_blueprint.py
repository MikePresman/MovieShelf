from flask import Blueprint, make_response, request
from jsonschema import validate
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User, db
from .auth_service_schema import register_schema, login_schema
from flask_jwt_extended import (create_access_token,
                                create_refresh_token, get_jwt_identity, jwt_required, get_jwt)


auth_service_blueprint = Blueprint('auth_service_blueprint', __name__)

@auth_service_blueprint.route("/login", methods = ["POST"])
def login():
    try:
        validate(request.json, schema = login_schema)
        if (request.json.get('username') == None or request.json.get('password') == None):
            raise Exception
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 400

    username = request.json["username"]
    password = request.json["password"]
    
    user = User.query.filter_by(username = username).first()
    if (user != None):
        try:
            auth, details = user.authenticate(password)
            if (auth != False):
                return details
        except Exception as e:
            return {"Error", 500}, 500 #server error
    return {"Error": 401}, 401 #unauthorized



@auth_service_blueprint.route("/register", methods = ["POST"])
def register():
    try:
        validate(request.json, schema = register_schema)
        if (request.json.get('username') == None or request.json.get('password') == None or request.json.get('email')):
            raise Exception
    except Exception as e:
        return {"Error": "Please Enter Valid Data"}, 400
    
    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]


    if (User.query.filter_by(username = username).first() != None or User.query.filter_by(email = email).first() != None):
        return {"Error": 409}, 409
    else:
        try:
            hashed_pword = generate_password_hash(password)
            user = User(username = username, email = email, status = 0, password_hash = hashed_pword)
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            print(e)
            return {"Error": 500}, 500
    return {'Success': 200}, 200


#this route generates a new token if refresh token is valid (refresh = True)
@auth_service_blueprint.route("/token", methods = ["POST"])
@jwt_required(refresh=True)
def token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    refresh_token = create_refresh_token(identity=identity)
    return {'access_token': access_token, 'refresh_token': refresh_token}




@auth_service_blueprint.route("/getkey", methods = ["POST"])
@jwt_required()
def protected():
    claims = get_jwt_identity()
    claims_2 = get_jwt()
    print(get_jwt())
    print(claims)
    return {"ok": 1}



@auth_service_blueprint.route("/test", methods=["GET"])
def test():
    return schema
