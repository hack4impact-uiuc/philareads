from flask import Flask, jsonify, request, Blueprint
from api.models import User, db
from api.core import create_response, serialize_list, logger

authenticate = Blueprint("authenticate", __name__)


# function that is called when you visit /register
@authenticate.route("/register", methods=["POST"])
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

# function that is called when you visit /login
@authenticate.route("/login", methods=["POST"])
def login_user():
    post_data = request.get_json()

    #try:
    # fetch the user data
    user = User.query.filter_by(
        name=request.form['name']
      ).first()
    if user is not None:
        auth_token = user.encode_auth_token()
        if auth_token:
            responseObject = {
                'status': 'success',
                'message': 'Successfully logged in.',
                'auth_token': auth_token.decode()
            }
            return create_response(jsonify(responseObject)), 200



    return create_response(None)

# @register.route("/users", methods=["GET"])
# def get_all_users():
#     users = User.query.all()
#     logger.info(users)
#     return create_response(data={"users": users})
