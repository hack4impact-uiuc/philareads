import logo from '../logo.svg';
import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Sign up with us below!</p>
          <form action="/login">
            <p>Username:</p>
            <input type="text" />
            <p>Email:</p>
            <input type="email" />
            <p>Password:</p>
            <input type="password" />
            <p>Confirm Password:</p>
            <input type="password" />
            <br />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default Register;
