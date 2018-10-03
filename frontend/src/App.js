import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to PhilaREADS homepage!</p>
          <a
            className="App-link"
            href="https://github.com/hack4impact-uiuc/philareads/blob/master/contributing.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
