import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  Button,
  CardImg,
  CardSubtitle,
  CardBody,
  CardGroup,
  CardHeader,
  CardFooter,
  Row,
  Col
} from 'reactstrap';

class Advice extends Component {
  renderFullOutCard = () => {
    return (
      <Card body id="full-out" style={{ border: '1px solid gray' }}>
        <CardHeader tag="h3">Any Questions?</CardHeader>
        <CardBody>
          <CardTitle>
            Do you have any questions that haven't been addressed yet?
          </CardTitle>
          <CardText>
            Let us know below what you're curious about, and we'll respond ASAP
          </CardText>
          <Button>Submit</Button>
        </CardBody>
        <CardFooter>Philadephia Reads (r)</CardFooter>
      </Card>
    );
  };

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
          <CardGroup style={{ marginBottom: '50px' }}>
            {this.renderFullOutCard()}
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;
