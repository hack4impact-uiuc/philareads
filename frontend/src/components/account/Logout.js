import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

function Logout(props) {
  const cookies = new Cookies();
  cookies.remove('jwt', { path: '/' });
  return <Redirect to="/" />;
}

export default Logout;
