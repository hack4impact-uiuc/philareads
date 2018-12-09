import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Progress
} from 'reactstrap';
import { badgeMap } from '../utils/badgeMap.js';
import '../styles/BadgesPage.scss';
import { getBadges } from '../utils/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  }

  componentDidMount() {
    this.getBadges();
  }

  getBadges = async () => {
    this.setStateLoading();
    const {
      success,
      result: { badgesInProgress, badgesEarned },
      message
    } = await getBadges();

    if (success) {
      this.setState({
        badgesInProgress: badgesInProgress,
        badgesEarned: badgesEarned
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
        <Row className="bar" key={badge.id}>
          <Col lg="3" align="center" className="ip-badge">
            <img src={badgeMap[badge.graphic]} width="50" alt={badge.graphic} />
          </Col>
          <Col lg="9" align="center">
            <Progress
              color="success"
              value={(badge.currentCount / badge.targetCount) * 100}
            />
          </Col>
        </Row>
      );
    });
  };

  renderEarnedBadges = () => {
    return this.state.badgesEarned.map(badge => {
      return (
        <div className="earned-badge" key={badge.id}>
          <img
            alt={badge.graphic}
            src={badgeMap[badge.graphic]}
            width="50"
            className="completed-badge"
          />
          <p align="center">{badge.year}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="profile">
        <Container>
          <h1 className="page-title">Badges</h1>
          <Card>
            <CardBody>
              <CardTitle>In Progress</CardTitle>
              {this.renderInProgressBadges()}
              <br />
              <CardTitle>Completed</CardTitle>
              <div className="earned-badges">
                <Row className="row-badges">{this.renderEarnedBadges()}</Row>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default BadgesPage;
