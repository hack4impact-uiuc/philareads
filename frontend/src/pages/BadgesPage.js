import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Progress
} from 'reactstrap';
import Blank_Book from '../images/final_badges/Blank_Book.svg';
import Blank_Quiz from '../images/final_badges/Blank_Quiz.svg';
import Blank_Perfect from '../images/final_badges/Blank_Perfect.svg';
import Bronze_Book from '../images/final_badges/Bronze_Book.svg';
import Bronze_Quiz from '../images/final_badges/Bronze_Book.svg';
import Bronze_Perfect from '../images/final_badges/Blank_Perfect.svg';

import '../styles/BadgesPage.scss';

class BadgesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badges: []
    };
  }

  render() {
    return (
      <div className="profile">
        <Container fluid={true}>
          <h1 className="page-title">Badges</h1>
          <Row>
            <Col lg="3">
              <Card>
                <CardBody>
                  <CardText>Badges</CardText>
                  <CardText>Quiz History</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col lg="9">
              <Card>
                <CardBody>
                  <CardTitle>In Progress</CardTitle>
                  <Row className="bar">
                    <Col lg="3" align="center">
                      <img src={Blank_Book} width="50" />
                    </Col>
                    <Col lg="9" align="center">
                      <Progress value="25" />
                    </Col>
                  </Row>
                  <br />
                  <Row className="bar">
                    <Col lg="3" align="center">
                      <img src={Blank_Quiz} width="50" />
                    </Col>
                    <Col lg="9" align="center">
                      <Progress value="50" />
                    </Col>
                  </Row>
                  <br />
                  <Row className="bar">
                    <Col lg="3" align="center">
                      <img src={Blank_Perfect} width="50" />
                    </Col>
                    <Col lg="9" align="center">
                      <Progress value="75" />
                    </Col>
                  </Row>
                  <br />
                  <CardTitle>Completed</CardTitle>
                  <Row>
                    <Col lg="1" align="center">
                      <img
                        src={Bronze_Quiz}
                        width="50"
                        class="completed-badge"
                      />
                      <p>2018</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BadgesPage;
