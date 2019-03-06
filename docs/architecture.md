# High Level Architecture
This application is built with a react frontend and flask backend

## React Frontend
The frontend is built using [React](https://reactjs.org/) (bootstrapped from [create-react-app](https://facebook.github.io/create-react-app/)). Routing is handled by [React Router](https://reacttraining.com/react-router/), and styling is partially handled by [Reactstrap](https://reactstrap.github.io/) using a theme found off [Bootswatch](https://bootswatch.com/sketchy/). The frontend src directory contains most of the relevant code and contains five subdirectories:
* `components` - Contains many React components that are reused and combined to build each page.
* `images` - Contains static images such as badge images, blank book images, and icons.
* `pages` - Contains pages which are React components that are endpoints of a React router route
* `styles` - Contains SCSS files used to modify reactstrap's default styling.
* `utils` - Contains utilities for application, such as input validators or api calls.

## Flask Backend
The backend is built on [Flask](http://flask.pocoo.org/) (bootstrapped from [Flask Boilerplate](https://github.com/tko22/flask-boilerplate)). 
We use [SQLAlchemy](https://www.sqlalchemy.org/) as an ORM, and [PostgreSQL](https://www.postgresql.org/) for our database. Reading the [Boilerplate Docs](https://github.com/tko22/flask-boilerplate/wiki/Understanding-this-boilerplate) will give a good understanding of the purpose of each subdirectory and general layout of the backend code.

## Deployment
When the app is deployed the frontend is being served as static files (generated from `npm run build`) via the flask backend. These files are served from the `backend/api/react_frontend` directory.