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
  CardFooter
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
      <Card body id="full-out">
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
            <Card
              body
              inverse
              style={{ backgroundColor: '#333', border: '1px solid blue' }}
            >
              <CardImg src={image} />
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
          );
        } else {
          return (
            <Card>
              <CardImg height="50%" src={image} />
              <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardText>
                  {text}
                  <small className="text-muted">{smallText}</small>
                </CardText>
                <Button>{button}</Button>
              </CardBody>
            </Card>
          );
        }
      }
    );
  };

  render() {
    console.log(this.props.adviceCards);
    return (
      <div>
        <div id="mainAdvice">
          <CardGroup>
            {this.renderCards()}
            {this.renderFullOutCard()}
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;
