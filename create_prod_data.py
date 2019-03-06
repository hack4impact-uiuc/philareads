import requests

API_URL = "https://philareads.herokuapp.com/api/"

# sample admin user
sample_user = {"username": "admin", "name": "Philadelphia READS", "password": "admin"}

# create a user
r = requests.post(API_URL + "register", json=sample_user)
result = r.json()["result"]
print(result)
user_token = result["auth_token"]
credentials = {"jwt": user_token}

# make it an admin account
print("making admin an admin")
from api import create_app
from api.models import db, User

app = create_app()
app.app_context().push()
admin = User.query.get(1)
# verify that david chang exists
if admin is not None:
    admin.is_admin = True
    db.session.commit()
else:
    print("Admin was not created correctly :(")