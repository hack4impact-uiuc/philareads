import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import logo from './logo.svg';
import './styles/App.scss';
import KidsPage from './pages/KidsPage';
import ParentsPage from './pages/ParentsPage';

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
        </div>
      </Router>
    );
  }
}

export default App;
