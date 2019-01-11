from api.models import db, User
from flask import current_app, json

API_PREFIX = "/api"


def setup():
    current_app.config["SECRET_KEY"] = "secret_key"


def test_double_register(client):
    client.post(
        API_PREFIX + "/register",
        data=json.dumps(
            dict(name="double", password="password123", username="double@gmail.com")
        ),
        content_type="application/json",
    )

    res = client.post(
        API_PREFIX + "/register",
        data=json.dumps(
            dict(name="double", password="password123", username="double@gmail.com")
        ),
        content_type="application/json",
    )

    assert res.status_code == 409


def test_register(client):
    res = client.post(
        API_PREFIX + "/register",
        data=json.dumps(
            dict(name="rob", password="password123", username="rob_test@gmail.com")
        ),
        content_type="application/json",
    )

    assert res.status_code == 201

    user_in_db = User.query.filter_by(username="rob_test@gmail.com").first()
    assert user_in_db is not None


def test_successful_login(client):
    user = User(name="bob", password="password123", username="test@gmail.com")

    db.session.add(user)
    db.session.commit()

    login_res = client.post(
        API_PREFIX + "/login",
        data=json.dumps(
            dict(name="bob", password="password123", username="test@gmail.com")
        ),
        content_type="application/json",
    )

    assert login_res.status_code == 200


def test_nonexistent_user(client):
    login_res = client.post(
        API_PREFIX + "/login",
        data=json.dumps(
            dict(name="tob", password="password123", username="doesnt_exist@gmail.com")
        ),
        content_type="application/json",
    )

    assert login_res.status_code == 401
