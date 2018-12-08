import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PReadsNavbar from './components/PReadsNavbar';
import Home from './pages/Home';
import NoMatchPage from './pages/NoMatchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './styles/App.scss';
import ParentsPage from './pages/ParentsPage';
import BookPage from './pages/BookPage';
import QuizPage from './pages/QuizPage';
import Logout from './components/Logout';
import Search from './pages/Search';
import AdminPage from './pages/admin/AdminPage';
import AdminAddBookPage from './pages/admin/AdminAddBookPage';
import AdminEditBookPage from './pages/admin/AdminEditBookPage';
import AdminCSVUploadPage from './pages/admin/AdminCSVUploadPage';
import RORedirectToCurrent from './pages/ReadingOlympics/RORedirectToCurrent';
import ROHome from './pages/ReadingOlympics/ROHome';
import ROYearGradeView from './pages/ReadingOlympics/ROYearGradeView';
import ROYearView from './pages/ReadingOlympics/ROYearView';
import AccountManagePage from './pages/AccountManagePage';
import BadgesPage from './pages/BadgesPage';

import './styles/App.scss';
import AdminProtection from './pages/protection/AdminProtection';
import AuthenticatedProtection from './pages/protection/AuthenticatedProtection';

function withAdminProtection(WrappedComponent) {
  // Only render this page if an admin user is logged in.
  return class extends Component {
    render() {
      return (
        <AdminProtection>
          <WrappedComponent {...this.props} />
        </AdminProtection>
      );
    }
  };
}

function withAuthenticatedProtection(WrappedComponent) {
  // Only render this page if user is logged in.
  return class extends Component {
    render() {
      return (
        <AuthenticatedProtection>
          <WrappedComponent {...this.props} />
        </AuthenticatedProtection>
      );
    }
  };
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={PReadsNavbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            {/*Authentication pages*/}
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={Logout} />
            {/*Ungrouped pages*/}
            <Route path="/parents" component={ParentsPage} />
            <Route path="/search" component={Search} />
            <Route path="/profile/badges" component={BadgesPage} />
            {/*Admin pages*/}
            <Route
              exact
              path="/admin"
              component={withAdminProtection(AdminPage)}
            />
            <Route
              exact
              path="/admin/book/csv_upload"
              component={withAdminProtection(AdminCSVUploadPage)}
            />
            <Route
              path="/admin/book/add"
              component={withAdminProtection(AdminAddBookPage)}
            />
            <Route
              path="/admin/book/edit"
              component={withAdminProtection(AdminEditBookPage)}
            />
            {/*Reading Olympics default year reroutes*/}
            <Route
              exact
              path="/ReadingOlympics/current/:grade(middle|intermediate)"
              component={RORedirectToCurrent}
            />
            <Route
              exact
              path="/ReadingOlympics/year/current"
              component={RORedirectToCurrent}
            />
            {/*Reading Olympics pages*/}
            <Route exact path="/ReadingOlympics" component={ROHome} />
            <Route
              exact
              path="/ReadingOlympics/:year/:grade(middle|intermediate)"
              component={ROYearGradeView}
            />
            <Route path="/ReadingOlympics/year/:year" component={ROYearView} />
            <Route
              exact
              path="/ReadingOlympics/book/:id"
              component={BookPage}
            />
            <Route
              path="/ReadingOlympics/book/:id/:quizID"
              component={QuizPage}
            />
            <Route
              path="/account"
              component={withAuthenticatedProtection(AccountManagePage)}
            />
            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
