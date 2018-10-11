from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger
import bcrypt

authenticate = Blueprint("authenticate", __name__)


# function that is called when you visit /register
@authenticate.route("/register", methods=["POST"])
def register_user():
    if request.form["email"] is None or request.form["name"] is None or request.form["password"] is None:
        return create_response(data={'status': 'fail'}, message='Missing required information.', status=422)

    duplicate_user = User.query.filter_by(
        email=request.form['email']
      ).first()

    if duplicate_user is not None:
        return create_response(data={'status': 'fail'}, message='User already exists.', status=409)

    user = User(
        name=request.form["name"],
        password=request.form["password"],
        email=request.form["email"]
    )

    db.session.add(user)
    db.session.commit()
    auth_token = user.encode_auth_token().decode()
    return create_response(data={"token": auth_token}, status=201)

# function that is called when you visit /login
@authenticate.route("/login", methods=["POST"])
def login_user():
    if (not "email" in request.form) or (not "password" in request.form):
        return create_response(message='Missing required information.', data={'status': 'fail'}, status=422)

    user = User.query.filter_by(
        email=request.form['email']
      ).first()

    if user is not None:
        if bcrypt.checkpw(request.form["password"].encode('utf8'), user.password.encode('utf8')):
            auth_token = user.encode_auth_token()
            responseObject = {
                'status': 'success',
                'auth_token': auth_token.decode()
            }
            return create_response(message='Successfully logged in.', data=responseObject, status=200)



    return create_response(data={'status': 'fail'}, message='Failed to log in.', status=401)

# @authenticate.route("/users", methods=["GET"])
# def get_all_users():
#     users = User.query.all()
#     logger.info(users)
#     return create_response(data={"users": users})
