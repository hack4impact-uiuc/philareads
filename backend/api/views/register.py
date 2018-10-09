from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger

register = Blueprint("register", __name__)


# function that is called when you visit /register
@register.route("/register", methods=["POST"])
def register_user():
    # user = User.query.filter_by()
    user = User(
        name=request.form["name"],
        password=request.form["password"]
    )
    db.session.add(user)
    db.session.commit()
    auth_token = user.encode_auth_token().decode()
    return create_response(data={"token": auth_token})

# @register.route("/users", methods=["GET"])
# def get_all_users():
#     users = User.query.all()
#     logger.info(users)
#     return create_response(data={"users": users})
