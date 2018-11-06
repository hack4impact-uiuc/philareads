import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import SearchResults from '../components/SearchResults';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  setSearchResults = data => {
    this.setState({ results: data });
  };

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <SearchBar searchCallback={this.setSearchResults} />
        </Row>
        <Row>
          <Col lg="4">
            <Filter />
          </Col>
          <Col lg="8">
            <SearchResults results={this.state.results} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
