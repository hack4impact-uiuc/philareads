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
import pats_cat from './../images/pats_cat.PNG';
import pretty_cat from './../images/pretty_cat.JPG';

class Advice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  // adviceCards = [
  //   {
  //     title: "Pat's Fat Cat",
  //     subtitle: "it is a tabby",
  //     text: "pat's cat is so chubby but so cute. i want to play with it",
  //     smallText: "",
  //     button: "More",
  //     image: pats_cat,
  //     specialCard: false
  //   },
  //   {
  //     title: "This is quite a beautiful cat",
  //     subtitle: "I found this cat's picture in the Catspotting facebook group and it was so nice i decided to save it on my phone.",
  //     text: "i want a cat but im not responsible enough to take care of my own life how can i take care of another one",
  //     smallText: "Last updated 3 mins ago",
  //     button: "More",
  //     image: "pretty_cat",
  //     specialCard: true
  //   }
  // ]

  renderCards = () => {
    this.props.adviceCards.map(
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

  /*
<PReadsNavbar navOptions={this.navigationOptions} />
{this.navigationOptions.map(({ route, name, component }) => {
  return <Route exact path={route} component={component} />;
})}
*/

  render() {
    return (
      <div>
        <div id="mainAdvice">
          <CardGroup>{this.renderCards}</CardGroup>
        </div>
      </div>
    );
  }
}

export default Advice;

/* div attributes
id, class (document-wide identifiers)
lang (language information), dir (text direction)
title (element title)
style (inline style information)
align (alignment)
onclick, ondblclick, onmousedown, onmouseup, onmouseover, onmousemove, onmouseout, onkeypress, onkeydown, onkeyup
*/

/*
<Card>
  <CardImg height="50%" src={ pats_cat }/>
  <CardBody>
    <CardTitle>First Advice</CardTitle>
    <CardSubtitle>Advice Subtitles</CardSubtitle>
    <CardText>bloopdi boop some description and stuffs let's see how this looks</CardText>
    <Button>More</Button>
  </CardBody>
</Card>
<Card body inverse style={{ backgroundColor: '#333', border: "1px solid blue"}}>
  <CardImg src={ pretty_cat } />
  <CardBody>
    <CardTitle>First Advice</CardTitle>
    <CardSubtitle>Advice Subtitles</CardSubtitle>
    <CardText>
      bloopdi boop some description and stuffs let's see how this looks
      <br/>
      <small className="text-muted">Last updated 3 mins ago</small>
    </CardText>
    <Button>More</Button>
  </CardBody>
</Card>
*/
