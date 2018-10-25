import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class FormAlert extends Component {
  constructor(props) {
    super(props);
  }
  getColor() {
    if (this.props.isRed) {
      return 'danger';
    }
    return 'danger';
  }
  render() {
    return <Alert color={this.getColor()}>{this.props.children}</Alert>;
  }
}

export default FormAlert;
