#!/bin/bash
./docker_recreate.sh
echo "Docker starting..."
sleep 2
echo "Database creating..."
pipenv run python manage.py recreate_db
sleep 1
echo "Running server..."
pipenv run python manage.py runserver &
SERVER_PID=$!
sleep 1
echo "Populating db with sample data..."
pipenv run python create_dummy_data.py
echo "DONE"
echo "run server with:"
echo "pipenv run python manage.py runserver"
kill $SERVER_PID