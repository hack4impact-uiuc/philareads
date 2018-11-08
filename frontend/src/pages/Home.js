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
import intermediate from './../images/home_intermediate.png';
import parents from './../images/home_parents.png';
import exercises from './../images/home_exercises.png';
import search from './../images/home_search.png';
import './../styles/Home.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col id="left">
              <Card className="parent">
                <h1>Reading Olympics</h1>
                {/* <div> */}
                <Card>
                  <CardTitle>Middle</CardTitle>
                  <CardText>Grades 1-3</CardText>
                  <a href="ReadingOlympics/2019/middle">
                    <span />
                  </a>
                </Card>
                {/* </div> */}
                <Card>
                  <CardTitle>Intermediate</CardTitle>
                  <CardText>Grades 4-6</CardText>
                  <CardImg className="image" src={intermediate} />
                  <a href="ReadingOlympics/2019/middle">
                    <span />
                  </a>
                </Card>
              </Card>
            </Col>
            <Col id="right">
              <Card>
                <CardTitle>For Parents</CardTitle>
                <CardText>
                  Click here for some advice on how to make the most out of your
                  child's leaning experience with the Reading Olympics.
                </CardText>
                <CardImg className="image" src={parents} />
                <a href="parents">
                  <span />
                </a>
              </Card>
              <Card>
                <CardTitle>Exercising/Archives</CardTitle>
                <CardText>Start your reading exercises here!</CardText>
                <CardImg className="image" src={exercises} />
                <a href="#">
                  <span />
                </a>
              </Card>
              <Card>
                <CardTitle>Search</CardTitle>
                <CardText>Search for your books here!</CardText>
                <CardImg className="image" src={search} />
                <a href="search">
                  <span />
                </a>
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
