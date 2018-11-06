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
    return this.props.adviceCards.map(
      ({ title, subtitle, text, smallText, button, image }) => {
        return (
          <Col
            sm="6"
            md="4"
            style={{ marginTop: '15px', marginBottom: '15px' }}
          >
            <Card
              body
              inverse
              style={{
                backgroundColor: '#333',
                border: '1px solid black',
                height: '100%'
              }}
            >
              <CardImg src={image} alt="" />
              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardText>
                  {text}
                  <br />
                  <small className="text-muted">{smallText}</small>
                </CardText>
                {button && <Button>{button}</Button>}
              </CardBody>
            </Card>
          </Col>
        );
      }
    );
  };

  render() {
    console.log(this.props.adviceCards);
    return (
      <div>
        <div id="mainAdvice" class="container">
          <CardGroup style={{ marginBottom: '50px' }}>
            <Row sm="10" style={{ marginBottom: '50px' }}>
              {this.renderCards()}
            </Row>
            {this.renderFullOutCard()}
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;
