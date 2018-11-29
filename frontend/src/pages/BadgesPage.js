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
import { badgeMap } from '../utils/badgeMap.js';
import '../styles/BadgesPage.scss';

class BadgesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badgesInProgress: [
        { graphic: badgeMap['blank_book'], currentCount: 3, targetCount: 5 }
      ],
      badgesEarned: [
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] },
        { year: 2018, graphic: badgeMap['silver_quiz'] }
      ]
    };
  }

  renderInProgressBadges = () => {
    return this.state.badgesInProgress.map(badge => {
      return (
        <Row className="bar">
          <Col lg="3" align="center">
            <img src={badge.graphic} width="50" />
          </Col>
          <Col lg="9" align="center">
            <Progress value={(badge.currentCount / badge.targetCount) * 100} />
          </Col>
        </Row>
      );
    });
  };

  renderEarnedBadges = () => {
    return this.state.badgesEarned.map(badge => {
      return (
        <div class="earned-badge">
          <img src={badge.graphic} width="50" class="completed-badge" />
          <p align="center">{badge.year}</p>
        </div>
      );
    });
  };

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
                  {this.renderInProgressBadges()}
                  <br />
                  <CardTitle>Completed</CardTitle>
                  <div className="earned-badges">
                    <Row className="row-badges">
                      {this.renderEarnedBadges()}
                    </Row>
                  </div>
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
