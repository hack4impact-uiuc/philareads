from flask import Blueprint
from flask import request
from api.core import (
    create_response,
    serialize_list,
    logger,
    invalid_model_helper,
    admin_route,
)
from api.models import db, ParentAdvice

parent_advice = Blueprint("parent_advice", __name__)


@parent_advice.route("/parent_advice", methods=["POST"])
@admin_route
def create_parent_advice(user_id):
    user_data = request.get_json()
    if invalid_model_helper(user_data, ["text"]):
        return create_response(
            message="Missing parent advice text", status=422, data={"status": "fail"}
        )
    parent_advice = ParentAdvice(user_data["text"])

    db.session.add(parent_advice)
    db.session.commit()

    return create_response(message="Successfully created a parent advice", status=200)


@parent_advice.route("/edit_parent_advice", methods=["POST"])
@admin_route
def edit_parent_advice(user_id):
    user_data = request.get_json()
    if invalid_model_helper(user_data, ["text", "id"]):
        return create_response(
            message="Missing parent advice id or text",
            status=422,
            data={"status": "fail"},
        )
    parent_advice = ParentAdvice.query.get(user_data["id"])
    if parent_advice is None:
        return create_response(
            message="Parent advice not found", status=422, data={"status": "fail"}
        )

    parent_advice.text = user_data["text"]

    db.session.commit()

    return create_response(message="Successfully edited a parent advice", status=200)


@parent_advice.route("/delete_parent_advice", methods=["POST"])
@admin_route
def delete_parent_advice(user_id):
    user_data = request.get_json()
    if invalid_model_helper(user_data, ["id"]):
        return create_response(
            message="Missing parent advice id or text",
            status=422,
            data={"status": "fail"},
        )
    parent_advice = ParentAdvice.query.get(user_data["id"])
    if parent_advice is None:
        return create_response(
            message="Parent advice not found", status=422, data={"status": "fail"}
        )

    db.session.delete(parent_advice)
    db.session.commit()

    return create_response(message="Successfully deleted a parent advice", status=200)


@parent_advice.route("/parent_advice", methods=["GET"])
def get_parent_advice():
    all_advices = ParentAdvice.query.all()
    advice_list = [advice.to_dict() for advice in all_advices]

    return create_response(
        message="Successfully returned parent advice",
        status=200,
        data={"results": advice_list},
    )
