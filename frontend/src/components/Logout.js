import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

function Logout(props) {
  const cookies = new Cookies();
  cookies.remove('jwt');
  return <Redirect to="/login" />;
}

export default Logout;
