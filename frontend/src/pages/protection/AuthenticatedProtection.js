import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUserData } from '../../utils/api';

// NOTE: This component only expects a SINGLE child in this.props.children.
//       The child should be a complete page.

class AuthenticatedProtection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined
    };
    this.checkIsLoggedIn();
  }

  checkIsLoggedIn = async () => {
    const { success, result, message } = await getUserData();
    if (success) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
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
