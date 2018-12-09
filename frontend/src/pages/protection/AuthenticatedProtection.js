import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

// NOTE: This component only expects a SINGLE child in this.props.children.
//       The child should be a complete page.

class AuthenticatedProtection extends Component {
  isLoggedIn = () => {
    const cookies = new Cookies();
    return cookies.get('jwt') !== undefined;
  };

  render() {
    if (this.isLoggedIn()) {
      return (
        <div>{React.cloneElement(this.props.children, { ...this.props })}</div>
      );
    } else {
      return <Redirect push to="/login" />;
    }
  }
}

export default AuthenticatedProtection;
