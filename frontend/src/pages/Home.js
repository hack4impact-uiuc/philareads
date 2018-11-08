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
              <Card className="parent">
                <h1>Reading Olympics</h1>
                <Card>
                  <CardTitle>Middle</CardTitle>
                  <CardText>Grades 1-3</CardText>
                </Card>
                <Card>
                  <CardTitle>Intermediate</CardTitle>
                  <CardText>Grades 4-6</CardText>
                  <CardImg
                    className="image"
                    src="https://chinesepod.com/img/channel/intermediate.png"
                  />
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
                <CardImg
                  className="image"
                  src="https://cdn1.iconfinder.com/data/icons/dream-icons-2/160/home-512.png"
                />
              </Card>
              <Card>
                <CardTitle>Exercising/Archives</CardTitle>
                <CardText>Start your reading exercises here!</CardText>
                <CardImg
                  className="image"
                  src="data:image/png;base64,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"
                />
              </Card>
              <Card>
                <CardTitle>Search</CardTitle>
                <CardText>Search for your books here!</CardText>
                <CardImg
                  className="image"
                  src="https://cms-assets.tutsplus.com/uploads/users/523/posts/27345/preview_image/search-icon-large.png"
                />
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
