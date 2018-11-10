import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Container, Col, Button, Card, CardBody, CardTitle } from 'reactstrap';
import '../../styles/ReadingOlympics.scss';
import { getROArchiveYears } from '../../utils/api';

const pathToMiddle = 'middle';
const pathToIntermediate = 'intermediate';

class ROHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: []
    };
  }

  componentDidMount() {
    getROArchiveYears({}).then(resJson => {
      this.setState({
        years: resJson.result.years
      });
    });
  }

  onClickMiddleSchool = () => {
    const { year } = this.props;
    this.props.history.push(`/ReadingOlympics/${year}/${pathToMiddle}`);
  };

  onClickIntermediate = () => {
    const { year } = this.props;
    this.props.history.push(`/ReadingOlympics/${year}/${pathToIntermediate}`);
  };

  renderSearch = () => {
    return (
      <Card className="search">
        <CardBody>
          <CardTitle>Search</CardTitle>
          Need to import Search component
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
                <h2>{this.props.year}</h2>
                <Button
                  className="navigation-button"
                  onClick={this.onClickMiddleSchool}
                  color="primary"
                  size="lg"
                  block
                >
                  Middle School Grades
                </Button>
                <Button
                  className="navigation-button"
                  onClick={this.onClickIntermediate}
                  color="primary"
                  size="lg"
                  block
                >
                  Intermediate Grades
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

ROHome.defaultProps = {
  year: 2019
};

export default ROHome;
