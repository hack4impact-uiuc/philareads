import logo from '../logo.svg';
import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Log in below!</p>
          <form action="/home">
            <p>Username:</p>
            <input type="text" />
            <p>Password:</p>
            <input type="password" />
            <br />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
