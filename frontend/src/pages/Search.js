import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import SearchResults from '../components/SearchResults';

class Search extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <SearchBar />
        </Row>
        <Row>
          <Col lg="4">
            <Filter />
          </Col>
          <Col lg="8">
            <SearchResults />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
