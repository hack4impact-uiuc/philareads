import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PReadsNavbar from '../components/PReadsNavbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Games from '../components/Games';
import Results from '../components/Results';
<<<<<<< cf2de9a05a0c1d85fc482fc885c45e625a8f444c
=======
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ParentsPage from './ParentsPage';
import Catalog from '../components/Catalog';
>>>>>>> rendered 6 cards on initial page

class KidsPage extends Component {
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
            <PReadsNavbar
              navOptions={this.navigationOptions}
              homePage={'/kids'}
            />
            {this.navigationOptions.map(({ route, name, component }) => {
              // Add all the routes and their component mappings
              return <Route exact path={route} component={component} />;
            })}
          </div>
        </Router>
      </div>
    );
  }
}

export default KidsPage;
