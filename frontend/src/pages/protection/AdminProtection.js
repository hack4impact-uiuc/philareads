import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUserData } from '../../utils/api';

// NOTE: This component only expects a SINGLE child in this.props.children.
//       The child should be a complete page.

class AdminProtection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined,
      isAdmin: undefined
    };
    this.checkIsAdmin();
  }

  checkIsAdmin = async () => {
    const { success, result, message } = await getUserData();
    console.log(result.is_admin);
    if (success) {
      this.setState({ isAdmin: result.is_admin, isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false, isAdmin: false });
    }
  };

  render() {
    const { isAdmin, isLoggedIn } = this.state;
    if (isAdmin === undefined || isLoggedIn === undefined) {
      return null;
    }

    if (!isLoggedIn) {
      return <Redirect push to="/login" />;
    }

    if (!isAdmin) {
      return <Redirect to="/" />;
    }

    return (
      <div>{React.cloneElement(this.props.children, { ...this.props })}</div>
    );
  }
}

export default AdminProtection;
