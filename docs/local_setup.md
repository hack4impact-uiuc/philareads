# Local Setup
To run this app you must have node.js/npm and python3.7 installed.

## Frontend
Assuming you have node and npm installed, run the following commands
```
cd frontend
npm install
```
This will install all needed dependencies into the node_modules folder. Then to run the local development frontend server do
```
npm start
```
The site should be displayed in the default browser at  `http://localhost:3000`

## Backend
It is recommended to use pipenv and python3.7 when working with the backend to make dependency management as easy as possible. Follow the instructions [here](https://pipenv.readthedocs.io/en/latest/install/) to install pipenv

Additionally it is recommended to have docker so that an instance of postgresql can run on your local machine as well. 

Once these pieces of software are installed start up a postgresql instance with
```
docker run -e POSTGRES_USER=testusr -e POSTGRES_PASSWORD=password -e POSTGRES_DB=testdb -p 5432:5432 -v flask-app-db:/var/lib/postgresql/data -d postgres:10
```

Then, install the python dependencies:

```
pipenv install
pipenv install --dev
```

Then start up the server with
```
./reset_db_with_sample_data.sh
pipenv run python manage.py runserver
```

The server should now be running and available at http://localhost:5000