import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/kids">Kids</a>
        </header>
      </div>
    );
  }
}

export default Home;
