from flask import Flask, jsonify, request, Blueprint
from api.models import Year, db
from api.core import create_response, serialize_list, logger, admin_route
import datetime
import pdb

year = Blueprint("year", __name__)


def init_year():
    now = datetime.datetime.now()
    cur_year = now.year
    if now.month >= 11:
        cur_year += 1
    year_obj = Year(cur_year)
    db.session.add(year_obj)
    db.session.commit()


@year.route("/year", methods=["GET"])
def get_year():
    if len(Year.query.all()) == 0:
        init_year()

    cur_year = Year.query.get(1).year
    return create_response(
        message="Successfully retrieved year", data={"year": cur_year}, status=200
    )


@year.route("/year", methods=["POST"])
@admin_route
def set_year(user_id):
    user_data = request.get_json()
    if "year" not in user_data:
        return create_response(message="Missing year", status=409)

    cur_year = Year.query.get(1)
    cur_year.year = user_data["year"]

    db.session.commit()

    return create_response(
        message="Successfully updated year", status=200, data={"status": "success"}
    )
