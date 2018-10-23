import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './styles/App.scss';
import KidsPage from './pages/KidsPage';
import ParentsPage from './pages/ParentsPage';
import TestPage from './pages/TestPage';

import Logout from './components/Logout';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/kids" component={KidsPage} />
          <Route path="/parents" component={ParentsPage} />
          <Route path="/questions" component={TestPage} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

export default App;
