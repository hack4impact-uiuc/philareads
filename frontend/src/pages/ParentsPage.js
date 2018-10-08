import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Results from '../components/Results';

class ParentsPage extends Component {
  navigationOptions = [
    {
      route: '/parents',
      name: 'Home',
      component: Homefeed
    },
    {
      route: '/parents/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      route: '/parents/readings',
      name: 'Readings',
      component: Readings
    },
    {
      route: '/parents/results',
      name: 'Results',
      component: Results
    }
  ];

  render() {
    return (
      <div>
        <h1>Parents Page</h1>
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

export default ParentsPage;
