import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardImgOverlay,
  Button,
  CardImg,
  CardColumns,
  CardSubtitle,
  CardBody,
  CardGroup,
  CardHeader,
  CardFooter,
  Row,
  Col
} from 'reactstrap';

class Advice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  renderFullOutCard = () => {
    return (
      <Card body id="full-out" style={{ border: '1px solid gray' }}>
        <CardHeader tag="h3">Woahhhh</CardHeader>
        <CardBody>
          <CardTitle>oooh lookie here</CardTitle>
          <CardText>bitch this is card text</CardText>
          <Button>Click me biiiih</Button>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
  };

  renderCards = () => {
    if (this.props.adviceCards === undefined) {
      return <div />;
    }
    return this.props.adviceCards.map(
      ({ title, subtitle, text, smallText, button, image, specialCard }) => {
        if (specialCard === true) {
          return (
            <Col sm="6" md="4">
              <Card
                body
                inverse
                outline
                style={{ backgroundColor: '#333', border: '1px solid blue' }}
              >
                <CardImg src={image} alt="Cat?" styling={{ height: '50px' }} />
                <CardBody>
                  <CardTitle>{title}</CardTitle>
                  <CardSubtitle>{subtitle}</CardSubtitle>
                  <CardText>
                    {text}
                    <br />
                    <small className="text-muted">{smallText}</small>
                  </CardText>
                  <Button>{button}</Button>
                </CardBody>
              </Card>
            </Col>
          );
        } else {
          return (
            <Col sm="6" md="4">
              <Card outline>
                <CardImg src={image} alt="Cat?" styling={{ height: '50px' }} />
                <CardBody>
                  <CardTitle>{title}</CardTitle>
                  <CardSubtitle>{subtitle}</CardSubtitle>
                  <CardText>
                    {text}
                    <br />
                    <small className="text-muted">{smallText}</small>
                  </CardText>
                  <Button>{button}</Button>
                </CardBody>
              </Card>
            </Col>
          );
        }
      }
    );
  };

  render() {
    console.log(this.props.adviceCards);
    return (
      <div>
        <div id="mainAdvice" class="container">
          <CardGroup>
            <Row sm="10">{this.renderCards()}</Row>
            {this.renderFullOutCard()}
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;
