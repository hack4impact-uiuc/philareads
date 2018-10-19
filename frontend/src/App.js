import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './styles/App.scss';
import KidsPage from './pages/KidsPage';
import ParentsPage from './pages/ParentsPage';
<<<<<<< HEAD
import TestPage from './pages/TestPage';

=======
import Logout from './components/Logout';
>>>>>>> Added logout functionality
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
<<<<<<< HEAD
          <Route path="/questions" component={TestPage} />
=======
          <Route path="/logout" component={Logout} />
>>>>>>> Added logout functionality
        </div>
      </Router>
    );
  }
}

export default App;
