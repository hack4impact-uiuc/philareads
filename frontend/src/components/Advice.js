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
  CardGroup
} from 'reactstrap';

class Advice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

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
          <CardGroup>{this.renderCards()}</CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;
