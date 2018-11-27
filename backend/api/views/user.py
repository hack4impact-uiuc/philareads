from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger
import bcrypt

user = Blueprint("user", __name__)

# function that edits user model
@user.route("/edit_user", methods=["POST"])
def edit_user():
    user_data = request.get_json()

    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return create_response(
            message="User not found", status=400, data={"status": "fail"}
        )

    # name or email not included in json
    if ("name" not in user_data) or ("email" not in user_data):
        return create_response(
            message="Missing fields", status=400, data={"status": "fail"}
        )

    # name or email left blank
    if (len(user_data["name"]) == 0) or (len(user_data["email"]) == 0):
        return create_response(
            message="Empty fields", status=400, data={"status": "fail"}
        )

    user.name = user_data["name"]
    user.email = user_data["email"]
    db.session.commit()

    return create_response(
        message="Successfully updated user", status=200, data={"status": "success"}
    )


# function that edits user password
@user.route("/edit_password", methods=["POST"])
def check_password():
    user_data = request.get_json()

    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return create_response(
            message="Invalid user", status=400, data={"status": "fail"}
        )

    if bcrypt.checkpw(
        user_data["old_password"].encode("utf8"), user.password.encode("utf8")
    ):
        user.password = bcrypt.hashpw(
            user_data["new_password"].encode("utf8"), bcrypt.gensalt()
        ).decode("utf8")

        db.session.commit()
        return create_response(
            message="Successfully changed the password",
            data={"status": "success"},
            status=200,
        )

    else:
        return create_response(
            message="Invalid password", status=400, data={"status": "failure"}
        )


# function returns user data
@user.route("/user", methods=["GET"])
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
