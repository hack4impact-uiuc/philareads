# Script documentation
Included in the backend and root project folder are a number of helpful scripts which may make development easier or less time consuming. Each script is outlined here

## docker_recreate.sh
Assuming you have docker running this script will clear any instances of postgresql currently running, recreate a postgresql docker instance, and then recreate the database schemas using ```pipenv run python manage.py recreate_db```

This script can be useful for when you want to completely reset the database to a blank slate

## docker_wipe.sh
This is nearly the same as `docker_recreate.sh` except it does not recreate the database schemas at the end. It simply restarts the postgresql instance that is currently running or starts a new one if no instance is running.

## reset_db_with_sample_data.sh
This script runs `docker_recreate.sh` and then starts a backgrounded version of the flask server which it continually calls to populate the database with information provided in the `create_dummy_data.py` python script. After finishing populating the data, the backgrounded server is closed.

This script can be very useful for resetting the database but also filling it with some sample data for testing purposes.

## build_and_move.sh
This script builds the react frontend into a set of static files and then moves those files into the appropriate directory `backend/api/react_frontend` to be served by the backend.

Simply saves time when trying to build the frontend and move it to the backend.