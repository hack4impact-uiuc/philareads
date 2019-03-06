import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { URLParamToString } from '../utils/formatHelpers';
import RedirectingSearchBar from '../components/search/RedirectingSearchBar';
import parents from './../images/home_parents.png';
import './../styles/Home.scss';

const pathToMiddle = 'middle';
const pathToIntermediate = 'intermediate';

class Home extends Component {
  shouldShowAlert() {
    if (this.props.location.state) {
      return this.props.location.state.referrer;
    }
    return null;
  }

  onClickMiddleSchool = () => {
    this.props.history.push(`/ReadingOlympics/current/${pathToMiddle}`);
  };

  onClickIntermediate = () => {
    this.props.history.push(`/ReadingOlympics/current/${pathToIntermediate}`);
  };

  render() {
    return (
      <div className="home">
        {this.shouldShowAlert() !== null && (
          <Alert color="success">
            <h5 className="text-center">You're now logged in</h5>
          </Alert>
        )}
        <h1 className="page-title">Read at Home</h1>

        <Container>
          <Row>
            <Col className="left-main-col">
              <Card className="parent">
                <h2>Reading Olympics</h2>
                <CardBody>
                  <Button
                    className="navigation-button"
                    onClick={this.onClickMiddleSchool}
                    color="primary"
                    size="lg"
                    block
                  >
                    {URLParamToString(pathToMiddle)}
                  </Button>
                  <Button
                    className="navigation-button"
                    onClick={this.onClickIntermediate}
                    color="primary"
                    size="lg"
                    block
                  >
                    {URLParamToString(pathToIntermediate)}
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="right-sidebar">
              <Card>
                <CardBody>
                  <CardTitle>Search</CardTitle>
                  <RedirectingSearchBar history={this.props.history} />
                </CardBody>
              </Card>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
