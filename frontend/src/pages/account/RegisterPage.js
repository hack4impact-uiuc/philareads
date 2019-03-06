import React, { Component } from 'react';
import Register from '../../components/account/Register';

class RegisterPage extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Register</h1>
        <Register />
      </div>
    );
  }
}

export default RegisterPage;
