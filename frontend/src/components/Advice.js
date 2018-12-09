import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

class Advice extends Component {
  renderCards = () => {
    if (this.props.adviceCards === undefined) {
      return <div />;
    }

    return (
      <Card body style={{ border: '1px solid gray' }}>
        <CardBody>
          <div dangerouslySetInnerHTML={{ __html: this.props.adviceCards }} />
        </CardBody>
      </Card>
    );
  };

  render() {
    console.log(this.props.adviceCards);
    return (
      <div>
        <div id="mainAdvice" class="container">
          {this.renderCards()}
          <br />
        </div>
      </div>
    );
  }
}

export default Advice;
