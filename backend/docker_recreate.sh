#!/bin/bash
IFS=' '
docker_ps_out=$(docker ps | grep 'postgres')
read -ra docker_args <<< "$docker_ps_out"
docker_id=${docker_args[0]}
docker stop $docker_id
echo y | docker system prune
echo y | docker volume prune
docker run -e POSTGRES_USER=testusr -e POSTGRES_PASSWORD=password -e POSTGRES_DB=testdb -p 5432:5432 -v flask-app-db:/var/lib/postgresql/data -d postgres:10
echo "recreating DB"
sleep 2
pipenv run python manage.py recreate_db
