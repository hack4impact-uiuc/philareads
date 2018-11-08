import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardImg,
  CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import intermediate from './../images/home_intermediate.png';
import parents from './../images/home_parents.png';
import exercises from './../images/home_exercises.png';
import search from './../images/home_search.png';
import './../styles/Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Container>
          <Row>
            <Col id="left">
              <Card className="parent">
                <h1>Reading Olympics</h1>
                <Card>
                  <CardTitle>Middle</CardTitle>
                  <CardText>Grades 1-3</CardText>
                  <Link to="/ReadingOlympics/2019/middle">
                    <span />
                  </Link>
                </Card>
                <Card>
                  <CardTitle>Intermediate</CardTitle>
                  <CardText>Grades 4-6</CardText>
                  <CardImg className="image" src={intermediate} />
                  <Link to="/ReadingOlympics/2019/intermediate">
                    <span />
                  </Link>
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
                <Link to="/parents">
                  <span />
                </Link>
              </Card>
              <Card>
                <CardTitle>Exercising/Archives</CardTitle>
                <CardText>Start your reading exercises here!</CardText>
                <CardImg className="image" src={exercises} />
                <Link to="/#">
                  <span />
                </Link>
              </Card>
              <Card>
                <CardTitle>Search</CardTitle>
                <CardText>Search for your books here!</CardText>
                <CardImg className="image" src={search} />
                <Link to="/search">
                  <span />
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
