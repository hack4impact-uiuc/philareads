import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class Filter extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Filter</CardTitle>
          <CardText>List of filters you can apply</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Filter;
