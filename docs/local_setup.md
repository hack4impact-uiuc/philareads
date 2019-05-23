# Local Setup
The development process uses `docker-compose`

[Docker](https://docs.docker.com/v17.12/install/) and [docker-compose](https://docs.docker.com/compose/install/) installation instructions

## Bring the project up
#### To start the project for the first time run:
```
docker-compose -f docker-compose-dev.yml up --build
```

#### After your first time running the project you will no longer need to build the docker images so you can leave out the `--build`:
```
docker-compose -f docker-compose-dev.yml up
```

This will bring up the Frontend, Backend, and Postgres database. You can access the frontend at [http://localhost:3000](http://localhost:3000)

#### To reset and reseed the database, first remove the postgres volume and then rebuild and start again:
```
docker volume rm flask-app-db
```

#### Each of these commands can easily be run using npm commands. For a full list of the available scripts run `npm run` from the main project directory:
```
Scripts available in philareads via `npm run-script`:
  dev:start docker-compose -f docker-compose-dev.yml up
  dev:start-build docker-compose -f docker-compose-dev.yml up --build
  dev:down docker-compose -f docker-compose-dev.yml down
  dev:purge-db docker volume rm flask-app-db
  dev:first-start npm run dev:down && npm run dev:purge-db && npm run dev:start-build
```

For example to start the project for the first time run:
```
npm run dev:first-start
```

#### Troubleshooting docker
If you run into issues with the docker process you can review logs that will make it easier for the team to help you:

```
docker-compose -f docker-compose-dev.yml logs
```
