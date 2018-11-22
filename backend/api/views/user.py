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

    user_dict = {"name": user.name, "email": user.email}

    return create_response(data={"user": user_dict}, status=201)
