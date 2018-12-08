from flask import Flask, jsonify, request, Blueprint
from api.models import Year, db
from api.core import create_response, serialize_list, logger, admin_route
import pdb

year = Blueprint("year", __name__)

def init_year():
    pass

@year.route("/year", methods=["GET"])
@admin_route
def get_year(user_id):
    if len(Year.query.all()) == 0:
        init_year()

    cur_year = Year.query.get(1).year
    return create_response(
        message="Successfully retrieved year", data={"year": cur_year}, status=200
    )
