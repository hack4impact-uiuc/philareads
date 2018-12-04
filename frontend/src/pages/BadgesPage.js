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
import { getBadges } from '../utils/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

library.add(faSpinner);

class BadgesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badgesInProgress: [],
      badgesEarned: [],
      alert: [],
      loading: false
    };

    this.getBadges();
  }

  getBadges = async () => {
    this.setStateLoading();
    const {
      success,
      result: { results },
      message
    } = await getBadges();
    console.log(results);

    if (success) {
      this.setState({
        badgesInProgress: results.badgesInProgress,
        badgesEarned: results.badgesEarned
      });
    } else {
      this.setStateAlert(message);
    }
  };

  setStateLoading = () => {
    this.setState({ loading: true });
  };

  setStateAlert = message => {
    this.setState({
      alert: message
    });
  };

  renderInProgressBadges = () => {
    return this.state.badgesInProgress.map(badge => {
      return (
        <Row className="bar">
          <Col lg="3" align="center" className="ip-badge">
            <img src={badgeMap[badge.graphic]} width="50" />
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
          <img
            src={badgeMap[badge.graphic]}
            width="50"
            class="completed-badge"
          />
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
                  <CardText>
                    <Link to="/profile/badges">Badges</Link>
                  </CardText>
                  <CardText>
                    <Link to="/profile/quiz-history">Quiz History</Link>
                  </CardText>
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
