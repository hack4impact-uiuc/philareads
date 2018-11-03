import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Container, Col, Button, Card, CardBody, CardTitle } from 'reactstrap';
import PReadsNavbar from '../../components/PReadsNavbar';
import Homefeed from '../../components/Homefeed';
import Exercises from '../../components/Exercises';
import Readings from '../../components/Readings';
import Games from '../../components/Games';
import Results from '../../components/Results';
import Catalog from '../../components/Catalog';
import Login from '../../components/Login';
import '../../styles/ReadingOlympics.scss';
import { getROArchiveYears } from '../../utils/api';

const pathToMiddle = 'middle';
const pathToIntermediate = 'intermediate';

class ROHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [props.year]
    };
  }

  navigationOptions = [
    {
      route: '/kids',
      name: 'Home',
      component: Homefeed
    },
    {
      route: '/kids/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      route: '/kids/readings',
      name: 'Readings',
      component: Readings
    },
    {
      route: '/kids/games',
      name: 'Games',
      component: Games
    },
    {
      route: '/kids/results',
      name: 'Results',
      component: Results
    }
  ];

  componentDidMount() {
    getROArchiveYears({}).then(resJson => {
      this.setState({
        years: resJson.result
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
            <Link to={`/ReadingOlympics/year/${y}`}>{y}</Link>
          ))}
        </CardBody>
      </Card>
    );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <PReadsNavbar navOptions={this.navigationOptions} />
          </div>
        </Router>
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
