from api.models import db, User
import pytest
from flask import current_app, json


def setup():
    current_app.config["SECRET_KEY"] = "secret_key"


sample_json_data = """
{
  "name": "Gatsby Quiz",
    "questions": [
        {
            "text": "Who is gatsby?",
            "options": ["A person", "A cow", "A dog"]
        },
        {
            "text": "Who is cowsby?",
            "options": ["A person", "A rat", "A dog"]
        },
        {
            "text": "Who is cowsby?",
            "options": ["A person", "A cow", "A dog"]
        }
    ]
} """


def test_create_valid_quiz(client):
    print("Starting POST...")
    # pytest.set_trace()
    res = client.post(
        "/create_quiz", data=sample_json_data, content_type="application/json"
    )

    print("RES IS")
    print(res)
    assert res.status_code == 200
