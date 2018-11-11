import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PReadsNavbar from './components/PReadsNavbar';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './styles/App.scss';
import ParentsPage from './pages/ParentsPage';
import BookPage from './pages/BookPage';
import QuizPage from './pages/QuizPage';
import Logout from './components/Logout';
import Search from './pages/Search';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ROHome from './pages/ReadingOlympics/ROHome';
import ROYearGradeView from './pages/ReadingOlympics/ROYearGradeView';
import ROYearView from './pages/ReadingOlympics/ROYearView';

import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={PReadsNavbar} />
          <Route exact path="/" component={Home} />
          {/*Authentication pages*/}
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={Logout} />
          {/*Ungrouped pages*/}
          <Route path="/parents" component={ParentsPage} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/admin" component={AdminPage} />
          {/*Reading Olympics pages*/}
          <Route exact path="/ReadingOlympics" component={ROHome} />
          <Route
            exact
            path="/ReadingOlympics/:year/:grade(middle|intermediate)"
            component={ROYearGradeView}
          />
          <Route path="/ReadingOlympics/year/:year" component={ROYearView} />
          <Route exact path="/ReadingOlympics/book/:id" component={BookPage} />
          <Route
            path="/ReadingOlympics/book/:id/:quizID"
            component={QuizPage}
          />
        </div>
      </Router>
    );
  }
}

export default App;
