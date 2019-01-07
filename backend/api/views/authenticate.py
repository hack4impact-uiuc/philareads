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
        (not "username" in user_data)
        or (not "password" in user_data)
        or (not "name" in user_data)
    ):
        return create_response(
            data={"status": "fail"},
            message="Missing username, password, or name",
            status=422,
        )

    duplicate_user = User.query.filter_by(username=user_data["username"]).first()

    if duplicate_user is not None:
        return create_response(
            data={"status": "fail"},
            message="Username already taken. Try adding some numbers at the end.",
            status=409,
        )

    user = User(
        name=user_data["name"],
        password=user_data["password"],
        username=user_data["username"],
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
    if (not "username" in user_data) or (not "password" in user_data):
        return create_response(
            message="Missing username or password", data={"status": "fail"}, status=422
        )

    user = User.query.filter_by(username=user_data["username"]).first()

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
        else:
            return create_response(
                message="Username/password combination is incorrect",
                status=401,
                data={"status": "fail"},
            )

    return create_response(
        data={"status": "fail"},
        message="Account with that username not found",
        status=401,
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

    if "user_username" not in user_data:
        return create_response(
            message="Missing username of user to upgrade",
            status=422,
            data={"status": "fail"},
        )

    user_to_upgrade = User.query.filter_by(username=user_data["user_username"]).first()

    if user_to_upgrade is None:
        return create_response(
            message="User with corresponding username not found",
            status=422,
            data={"status": "fail"},
        )

    user_to_upgrade.is_admin = True
    db.session.commit()

    return create_response(
        message="Successfully upgraded user", status=200, data={"status": "success"}
    )
