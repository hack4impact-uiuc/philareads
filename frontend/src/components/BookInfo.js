import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class BookInfo extends Component {
  render() {
    return <div>You are reading {this.props.bookObject.id}</div>;
  }
}

export default BookInfo;
