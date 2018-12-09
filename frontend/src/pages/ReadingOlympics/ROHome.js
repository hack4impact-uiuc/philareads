import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import {
  Container,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Input
} from 'reactstrap';
import '../../styles/ReadingOlympics.scss';
import { URLParamToString } from '../../utils/formatHelpers';
import { getROArchiveYears } from '../../utils/api';

const pathToMiddle = 'middle';
const pathToIntermediate = 'intermediate';

class ROHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      query: ''
    };
  }

  componentDidMount() {
    getROArchiveYears().then(resJson => {
      this.setState({
        years: resJson.result.years,
        currentYear: resJson.result.years[0]
      });
    });
  }

  onClickMiddleSchool = () => {
    this.props.history.push(`/ReadingOlympics/current/${pathToMiddle}`);
  };

  onClickIntermediate = () => {
    this.props.history.push(`/ReadingOlympics/current/${pathToIntermediate}`);
  };

  renderSearch = () => {
    return (
      <Card className="search">
        <CardBody>
          <CardTitle>Search</CardTitle>
          <Input
            type="text"
            bsSize="lg"
            placeholder="Search for a book..."
            onChange={event => {
              this.setState({ query: event.target.value });
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                console.log(this.state.query);
                this.props.history.push(`/search?query=${this.state.query}`);
              }
            }}
          />
        </CardBody>
      </Card>
    );
  };

  renderArchive = () => {
    return (
      <Card className="archive">
        <CardBody>
          <CardTitle>Archive</CardTitle>
          {this.state.years.map(y => (
            <Link key={y} to={`/ReadingOlympics/year/${y}`}>
              {y}
              <br />
            </Link>
          ))}
        </CardBody>
      </Card>
    );
  };

  render() {
    return (
      <div className="reading-olympics">
        <div className="page-title">
          <h1>Reading Olympics</h1>
        </div>
        <Container className="container">
          <Col className="left-main-col book-list">
            <Card className="main-content">
              <CardBody>
                <h2>{this.state.currentYear}</h2>
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
            {this.renderSearch()}
            {this.renderArchive()}
          </Col>
        </Container>
      </div>
    );
  }
}

export default ROHome;
