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

    # invalid user
    if user is None:
        return create_response(
            message="User not found", status=400, data={"status": "fail"}
        )

    if ("name" not in user_data) or ("email" not in user_data):
        return create_response(
            message="Missing fields", status=400, data={"status": "fail"}
        )

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

@user.route("/edit_password", methods=["POST"])
def check_password():
    user_data = request.get_json()

    print("here")

    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    print("here2")

    user = User.query.filter_by(id=user_id).first()

    print("here3")

    if user is None:
        return create_response(
            message="Invalid user", status=400, data={"status": "fail"}
        )

    print("here4")

    if bcrypt.checkpw(
        user_data["old_password"].encode("utf8"), user.password.encode("utf8")
    ):
        user.password = user_data["new_password"]
        db.session.commit()

        try:
            auth_token = user.encode_auth_token()
            responseObject = {
                "status": "success",
                "auth_token": auth_token.decode(),
            }
            return create_response(
                message="Successfully changed the password", data=responseObject, status=200
            )
        except:
            return create_response(
                message="Failed to generate auth_token",
                status=400,
                data={"status": "fail"},
            )

    else:
        return create_response(
            message="Invalid password", status=400, data={"status": "failure"}
        )
