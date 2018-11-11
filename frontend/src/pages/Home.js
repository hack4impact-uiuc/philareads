import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
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
        <h1 className="page-title">Read at Home</h1>
        <Container>
          <Row>
            <Col className="left-main-col">
              <Card className="parent">
                <h2>Reading Olympics</h2>
                <Card className="internal-card">
                  <CardBody>
                    <CardTitle>Middle</CardTitle>
                    <CardText>Grades 1-3</CardText>
                  </CardBody>
                  <Link to="/ReadingOlympics/2019/middle">
                    <span />
                  </Link>
                </Card>
                <Card className="internal-card">
                  <CardBody>
                    <CardTitle>Intermediate</CardTitle>
                    <CardText>Grades 4-6</CardText>
                  </CardBody>
                  <CardImg className="image" src={intermediate} />
                  <Link to="/ReadingOlympics/2019/intermediate">
                    <span />
                  </Link>
                </Card>
              </Card>
            </Col>
            <Col className="right-sidebar">
              <Card>
                <CardBody>
                  <CardTitle>For Parents</CardTitle>
                  <CardText>
                    Click here for some advice on how to make the most out of
                    your child's leaning experience with the Reading Olympics.
                  </CardText>
                </CardBody>
                <CardImg className="image" src={parents} />
                <Link to="/parents">
                  <span />
                </Link>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle>Exercising/Archives</CardTitle>
                  <CardText>Start your reading exercises here!</CardText>
                </CardBody>
                <CardImg className="image" src={exercises} />
                <Link to="/#">
                  <span />
                </Link>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle>Search</CardTitle>
                  <CardText>Search for your books here!</CardText>
                </CardBody>
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
