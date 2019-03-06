import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUserData } from '../../utils/api';
import Cookies from 'universal-cookie';

// NOTE: This component only expects a SINGLE child in this.props.children.
//       The child should be a complete page.

class AuthenticatedProtection extends Component {
  constructor(props) {
    super(props);

    // Check whether token exists
    const cookies = new Cookies();
    const hasToken = cookies.get('jwt') !== undefined;
    this.state = {
      isLoggedIn: hasToken ? undefined : false
    };
    this.checkValidToken();
  }

  checkValidToken = async () => {
    const { success, result } = await getUserData();
    this.setState({ isLoggedIn: success });
  };

  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn === undefined) {
      return null;
    }

    if (!isLoggedIn) {
      return <Redirect push to="/login" />;
    }

    return (
      <div>{React.cloneElement(this.props.children, { ...this.props })}</div>
    );
  }
}

export default AuthenticatedProtection;
