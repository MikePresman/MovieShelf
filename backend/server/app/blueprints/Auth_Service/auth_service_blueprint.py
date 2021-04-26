from flask import Blueprint, make_response, request
from jsonschema import validate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from app.models import User, db
from .auth_service_schema import register_schema

auth_service_blueprint = Blueprint('auth_service_blueprint', __name__)

@auth_service_blueprint.route("/login", methods = ["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username = username).first()
    
    if (user != None):
        auth, details = user.authenticate(password)
        if (auth != False):
            return details        
    return {'access_token': "null"} 



@auth_service_blueprint.route("/register", methods = ["POST"])
def register():
    try:
        validate(request.json, schema = register_schema)
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
