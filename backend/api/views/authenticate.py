from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger
import bcrypt

authenticate = Blueprint("authenticate", __name__)


# function that is called when you visit /register
@authenticate.route("/register", methods=["POST"])
def register_user():
    user_data = request.get_json()
    if (
        (not "email" in user_data)
        or (not "password" in user_data)
        or (not "name" in user_data)
    ):
        return create_response(
            data={"status": "fail"}, message="Missing required information.", status=422
        )

    duplicate_user = User.query.filter_by(email=user_data["email"]).first()

    if duplicate_user is not None:
        return create_response(
            data={"status": "fail"}, message="User already exists.", status=409
        )

    user = User(
        name=user_data["name"],
        password=user_data["password"],
        email=user_data["email"],
    )

    db.session.add(user)
    db.session.commit()
    try:
        auth_token = user.encode_auth_token().decode()
    except:
        return create_response(
            message="Failed to generate auth_token", status=400, data={"status": "fail"}
        )
    return create_response(data={"token": auth_token}, status=201)


# function that is called when you visit /login
@authenticate.route("/login", methods=["POST"])
def login_user():
    user_data = request.get_json()
    if (not "email" in user_data) or (not "password" in user_data):
        return create_response(
            message="Missing required information.", data={"status": "fail"}, status=422
        )

    user = User.query.filter_by(email=user_data["email"]).first()

    if user is not None:
        if bcrypt.checkpw(
            user_data["password"].encode("utf8"), user.password.encode("utf8")
        ):
            try:
                auth_token = user.encode_auth_token()
                responseObject = {
                    "status": "success",
                    "auth_token": auth_token.decode(),
                }
                return create_response(
                    message="Successfully logged in.", data=responseObject, status=200
                )
            except:
                return create_response(
                    message="Failed to generate auth_token",
                    status=400,
                    data={"status": "fail"},
                )

    return create_response(
        data={"status": "fail"}, message="Failed to log in.", status=401
    )


# @authenticate.route("/users", methods=["GET"])
# def get_all_users():
#     users = User.query.all()
#     logger.info(users)
#     return create_response(data={"users": users})
