import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import SearchResults from '../components/SearchResults';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import '../styles/Search.scss';

library.add(faSearch);
library.add(faSpinner);
library.add(faBookOpen);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preSearch: true,
      loading: false,
      notFound: false,
      results: []
    };
  }

  setSearchResults = data => {
    this.setState({ results: data });
  };

  render() {
    if (this.state.preSearch) {
      return (
        <Container fluid={true}>
          <Row>
            <SearchBar searchCallback={this.setSearchResults} />
          </Row>
          <Row>
            <h4>Type in a book title or author to look for a book.</h4>
          </Row>
          <Row>
            <FontAwesomeIcon className="search-icon" icon="search" size="8x" />
          </Row>
        </Container>
      );
    }
    if (this.state.loading) {
      return (
        <Container fluid={true}>
          <Row>
            <SearchBar searchCallback={this.setSearchResults} />
          </Row>
          <Row>
            <FontAwesomeIcon className="icon" icon="spinner" pulse size="8x" />
          </Row>
        </Container>
      );
    }
    if (this.state.notFound) {
      return (
        <Container fluid={true}>
          <Row>
            <SearchBar searchCallback={this.setSearchResults} />
          </Row>
          <Row>
            <h4>No books found. Try a different search.</h4>
          </Row>
          <Row>
            <FontAwesomeIcon
              className="search-icon"
              icon="book-open"
              size="8x"
            />
          </Row>
        </Container>
      );
    }

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
