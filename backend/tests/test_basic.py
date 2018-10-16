from api.models import db, User
from flask import current_app


def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200


def setup():
    current_app.config["SECRET_KEY"] = "secret_key"


def test_double_register(client):
    client.post(
        "/register",
        data=dict(name="double", password="password123", email="double@gmail.com"),
    )

    res = client.post(
        "/register",
        data=dict(name="double", password="password123", email="double@gmail.com"),
    )

    assert res.status_code == 409


def test_register(client):
    res = client.post(
        "/register",
        data=dict(name="rob", password="password123", email="rob_test@gmail.com"),
    )

    assert res.status_code == 201

    user_in_db = User.query.filter_by(email="rob_test@gmail.com").first()
    assert user_in_db is not None


def test_successful_login(client):
    user = User(name="bob", password="password123", email="test@gmail.com")

    db.session.add(user)
    db.session.commit()

    login_res = client.post(
        "/login", data=dict(name="bob", password="password123", email="test@gmail.com")
    )

    assert login_res.status_code == 200


def test_nonexistent_user(client):
    login_res = client.post(
        "/login",
        data=dict(name="tob", password="password123", email="doesnt_exist@gmail.com"),
    )

    assert login_res.status_code == 401
