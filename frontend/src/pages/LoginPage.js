import React, { Component } from 'react';
import Login from '../components/account/Login';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Login</h1>
        <Login />
      </div>
    );
  }
}

export default LoginPage;
