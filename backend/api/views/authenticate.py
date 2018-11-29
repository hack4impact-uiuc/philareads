from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger
import bcrypt
import jwt

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
        name=user_data["name"], password=user_data["password"], email=user_data["email"]
    )

    db.session.add(user)
    db.session.commit()
    try:
        auth_token = user.encode_auth_token().decode()
    except:
        return create_response(
            message="Failed to generate auth_token", status=400, data={"status": "fail"}
        )
    return create_response(data={"auth_token": auth_token}, status=201)


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


@authenticate.route("/upgrade_user", methods=["POST"])
def upgrade_user():
    try:
        token_user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except jwt.ExpiredSignatureError:
        return create_response(
            message="Expired token", status=401, data={"status": "fail"}
        )
    except jwt.InvalidTokenError:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    current_user = User.query.get(token_user_id)

    if not current_user.is_admin:  # they don't have privileges to upgrade another user
        return create_response(
            message="You must be an admin to upgrade another user to admin status",
            status=402,
            data={"status": "fail"},
        )

    user_data = request.get_json()

    if "user_email" not in user_data:
        return create_response(
            message="Missing email of user to upgrade",
            status=422,
            data={"status": "fail"},
        )

    user_to_upgrade = User.query.filter_by(email=user_data["user_email"]).first()

    if user_to_upgrade is None:
        return create_response(
            message="User with corresponding email not found",
            status=422,
            data={"status": "fail"},
        )

    user_to_upgrade.is_admin = True
    db.session.commit()

    return create_response(
        message="Successfully upgraded user", status=200, data={"status": "success"}
    )


@authenticate.route("/user", methods=["GET"])
def user_info():
    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except jwt.ExpiredSignatureError:
        return create_response(
            message="Expired token", status=401, data={"status": "fail"}
        )
    except jwt.InvalidTokenError:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    user = User.query.get(user_id)
    if user is None:
        return create_response(
            message="User not found", status=401, data={"status": "fail"}
        )

    user_data = {"name": user.name, "email": user.email}
    return create_response(message="Success", status=200, data=user_data)

@authenticate.route("/register_admin", methods=["POST"])
def register_admin():
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
        name=user_data["name"], password=user_data["password"], email=user_data["email"]
    )
    user.is_admin = True

    db.session.add(user)
    db.session.commit()
    try:
        auth_token = user.encode_auth_token().decode()
    except:
        return create_response(
            message="Failed to generate auth_token", status=400, data={"status": "fail"}
        )
    return create_response(data={"auth_token": auth_token}, status=201)
