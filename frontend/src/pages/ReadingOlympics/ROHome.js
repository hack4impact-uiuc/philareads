import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Container, Col, Button, Card, CardBody, CardTitle } from 'reactstrap';
import '../../styles/ReadingOlympics.scss';
import RedirectingSearchBar from '../../components/search/RedirectingSearchBar';
import { URLParamToString } from '../../utils/formatHelpers';
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
    getROArchiveYears().then(resJson => {
      this.setState({
        years: resJson.result.years,
        currentYear: resJson.result.years[0]
      });
    });
  }

  renderSearch = () => {
    return (
      <Card className="search">
        <CardBody>
          <CardTitle>Search</CardTitle>
          <RedirectingSearchBar history={this.props.history} />
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
                  tag={Link}
                  to="/readingolympics/current/middle"
                  size="lg"
                  block
                >
                  {URLParamToString(pathToMiddle)}
                </Button>
                <Button
                  className="navigation-button"
                  tag={Link}
                  to="/readingolympics/current/intermediate"
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
