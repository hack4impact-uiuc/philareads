from flask import Flask, jsonify, request, Blueprint
from api.models import User, db, Badge
from api.core import create_response, serialize_list, logger, authenticated_route
import bcrypt
import jwt

user = Blueprint("user", __name__)

# function that edits user model
@user.route("/edit_user", methods=["POST"])
@authenticated_route
def edit_user(user_id):
    user_data = request.get_json()
    user = User.query.get(user_id)

    if user is None:
        return create_response(
            message="User not found", status=400, data={"status": "fail"}
        )

    # name or username not included in json
    if ("name" not in user_data) or ("username" not in user_data):
        return create_response(
            message="Missing fields", status=400, data={"status": "fail"}
        )

    # name or username left blank
    if (len(user_data["name"]) == 0) or (len(user_data["username"]) == 0):
        return create_response(
            message="Empty fields", status=400, data={"status": "fail"}
        )

    user.name = user_data["name"]
    user.username = user_data["username"]
    db.session.commit()

    return create_response(
        message="Successfully updated user", status=200, data={"status": "success"}
    )


# function that edits user password
@user.route("/edit_password", methods=["POST"])
@authenticated_route
def check_password(user_id):
    user_data = request.get_json()
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
@authenticated_route
def user_info(user_id):
    user = User.query.get(user_id)
    if user is None:
        return create_response(
            message="User not found", status=401, data={"status": "fail"}
        )

    user_data = user.serialize_to_json()
    return create_response(message="Success", status=200, data=user_data)


# returns all in progress badges and already earned badges
@user.route("/badges", methods=["GET"])
@authenticated_route
def badges(user_id):
    user = User.query.get(user_id)
    if user is None:
        return create_response(
            message="User not found", status=401, data={"status": "fail"}
        )
    earned_badges = Badge.get_user_badges(user)
    badges_progress = Badge.get_progress_on_badges(user)
    response_dict = {
        "badgesEarned": [badge.serialize_to_json() for badge in earned_badges],
        "badgesInProgress": badges_progress,
    }
    return create_response(message="Success", status=200, data=response_dict)
