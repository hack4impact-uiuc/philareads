from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger
import bcrypt

user = Blueprint("user", __name__)

# function that returns all user info
@user.route("/user", methods=["GET"])
def get_user():
    try:
        user_id = User.decode_auth_token(request.cookies.get("jwt"))
    except:
        return create_response(
            message="Invalid token", status=401, data={"status": "fail"}
        )

    user = User.query.filter_by(id=user_id).first()
    print(user)

    # invalid user
    if user is None:
        return create_response(
            message="User not found", status=400, data={"status": "fail"}
        )

    user_dict = {"name": user.name, "email":user.email}

    return create_response(data={"user": user_dict}, status=201)

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
        message="Successfully updated user",
        status=200,
        data={"status": "success"},
    )
