import React, { Component } from 'react';
import {
  Container,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 10
    };
  }

  componentDidMount() {
    const ten_seconds = 10000;
    this.redirect = setTimeout(this.redirect, ten_seconds);
    this.ticker = setInterval(this.updateTimeRemaining, 1000);
  }

  componentWillUnmount() {
    if (this.redirect) {
      clearTimeout(this.redirect);
    }
    if (this.ticker) {
      clearTimeout(this.ticker);
    }
  }

  updateTimeRemaining = () => {
    this.setState(state => {
      return {
        timeRemaining: state.timeRemaining - 1
      };
    });
  };

  redirect = () => {
    this.props.history.push(`/`);
  };

  render() {
    return (
      <div className="no-match-page">
        <h1 className="page-title">Page Not Found</h1>
        <Container className="container">
          <Col>
            <Card className="main-content">
              <CardBody>
                <CardTitle>Uh oh! This page does not exist.</CardTitle>
                <CardText>
                  <p>
                    You could have reached this page through a stale link, or a
                    mistyped URL.
                  </p>
                  <p>
                    You'll be redirected to the <Link to="/">homepage</Link> in{' '}
                    {this.state.timeRemaining} seconds.
                  </p>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

export default RegisterPage;
