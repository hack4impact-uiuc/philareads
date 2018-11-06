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
import BookInfo from '../components/BookInfo';
import { getBookData } from '../utils/api';
import '../styles/BookPage.scss';
class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: props.match.params.id,
      bookData: getBookData(props.match.params.id)
    };
  }

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
              return (
                <Route key={name} exact path={route} component={component} />
              );
            })}
            <Route exact path={'/login'} component={Login} />
          </div>
        </Router>
        <BookInfo bookObject={this.state.bookData} />
        <Catalog />
      </div>
    );
  }
}

export default BookPage;
