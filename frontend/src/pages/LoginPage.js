import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PReadsNavbar from '../components/PReadsNavbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Games from '../components/Games';
import Results from '../components/Results';
import Catalog from '../components/Catalog';
import Login from '../components/Login';
class LoginPage extends Component {
  navigationOptions = [
    {
      route: '/kids',
      name: 'Home',
      component: Homefeed
    },
    {
      route: '/kids/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      route: '/kids/readings',
      name: 'Readings',
      component: Readings
    },
    {
      route: '/kids/games',
      name: 'Games',
      component: Games
    },
    {
      route: '/kids/results',
      name: 'Results',
      component: Results
    },
    {
      // TODO: remove in future
      route: '/kids/catalog',
      name: 'Catalog',
      component: Catalog
    }
  ];

  render() {
    return (
      <div>
        <Router>
          <div>
            <PReadsNavbar navOptions={this.navigationOptions} homePage={'/'} />
            {this.navigationOptions.map(({ route, name, component }) => {
              // Add all the routes and their component mappings
              return <Route exact path={route} component={component} />;
            })}
            <Route exact path={'/login'} component={Login} />;
          </div>
        </Router>
      </div>
    );
  }
}

export default LoginPage;
