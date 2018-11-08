import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import './../styles/Home.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col id="left">
              <h1>Reading Olympics</h1>
              <Card>
                <CardTitle>Middle</CardTitle>
              </Card>
              <Card>
                <CardTitle>Intermediate</CardTitle>
                <CardImg
                  top
                  width="75%"
                  src="https://chinesepod.com/img/channel/intermediate.png"
                />
              </Card>
            </Col>
            <Col id="right">
              <Card>
                <CardTitle>For Parents</CardTitle>
              </Card>
              <Card>
                <CardTitle>Exercising/Archives</CardTitle>
              </Card>
              <Card>
                <CardTitle>Search</CardTitle>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

/**
 * old render return()
 * <div className="App">
        <header className="App-header">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/kids">Kids</a>
        </header>
      </div>
 */

/**
  * <Container>
        <Row>
          <Col>
            <Card>
              <CardTitle>Reading Olympics</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardTitle>For Parents</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </Card>
            <Card>
              <CardTitle>Exercising/Archives</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </Card>
            <Card>
              <CardTitle>Search</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Button</Button>
            </Card>
          </Col>
        </Row>
      </Container>
  */
