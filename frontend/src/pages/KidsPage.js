import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Games from '../components/Games';
import Results from '../components/Results';

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
    }
  ];

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar navOptions={this.navigationOptions} />
            {this.navigationOptions.map(({ route, name, component }) => {
              return <Route exact path={route} component={component} />;
            })}
          </div>
        </Router>
      </div>
    );
  }
}

export default KidsPage;
