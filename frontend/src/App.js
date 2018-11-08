import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './styles/App.scss';
import KidsPage from './pages/KidsPage';
import ParentsPage from './pages/ParentsPage';
import TestPage from './pages/TestPage';
import ROHome from './pages/ReadingOlympics/ROHome';
import ROYearGradeView from './pages/ReadingOlympics/ROYearGradeView';
import ROYearView from './pages/ReadingOlympics/ROYearView';

import Logout from './components/Logout';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/kids" component={KidsPage} />
          <Route path="/parents" component={ParentsPage} />
          <Route path="/questions" component={TestPage} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/ReadingOlympics" component={ROHome} />
          <Route
            exact
            path="/ReadingOlympics/:year/:grade(middle|intermediate)"
            component={ROYearGradeView}
          />
          <Route path="/ReadingOlympics/year/:year" component={ROYearView} />
        </div>
      </Router>
    );
  }
}

export default App;
