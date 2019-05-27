import React, { Component } from 'react';
import { Container, Row, Alert } from 'reactstrap';
import queryString from 'query-string';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import DocumentTitle from 'react-document-title';

import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import '../styles/Search.scss';

library.add(faSearch);
library.add(faSpinner);
library.add(faBookOpen);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptUser: true,
      loading: false,
      notFound: false,
      results: [],
      alert: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    const queryParams = queryString.parse(props.location.search);
    // Provide empty string as default value
    return { query: queryParams.query || '' };
  }

  setStatePromptUser = query => {
    this.setState({ promptUser: true, loading: false, notFound: false });
  };

  setStateLoading = query => {
    this.setState({ promptUser: false, loading: true, notFound: false });
    this.props.history.push(`/search?query=${query}`);
  };

  setStateNotFound = () => {
    this.setState({ promptUser: false, loading: false, notFound: true });
  };

  setSearchResults = data => {
    this.setState({
      promptUser: false,
      loading: false,
      notFound: false,
      results: data
    });
  };

  setStateAlert = message => {
    this.setState({
      alert: message
    });
  };

  render() {
    let body = <SearchResults results={this.state.results} />;
    let header;

    if (this.state.promptUser) {
      body = (
        <div>
          <Row>
            <h4 className="alt-state">
              Type in a book title or author to search for a book.
            </h4>
          </Row>
          <Row>
            <FontAwesomeIcon className="search-icon" icon="search" size="8x" />
          </Row>
        </div>
      );
    }
    if (this.state.loading) {
      body = (
        <Row>
          <FontAwesomeIcon className="icon" icon="spinner" pulse size="8x" />
        </Row>
      );
    }
    if (this.state.notFound) {
      body = (
        <div>
          <Row>
            <h4 className="alt-state">
              No books found. Try a different search.
            </h4>
          </Row>
          <Row>
            <FontAwesomeIcon
              className="search-icon"
              icon="book-open"
              size="8x"
            />
          </Row>
        </div>
      );
    }
    if (this.state.alert !== null) {
      header = <Alert color="danger">{this.state.alert}</Alert>;
    }

    return (
      <DocumentTitle title="Search">
        <div className="search">
          {header}
          <Container fluid={true}>
            <Row>
              <SearchBar
                initialQuery={this.state.query}
                resetCallback={this.setStatePromptUser}
                loadCallback={this.setStateLoading}
                notFoundCallback={this.setStateNotFound}
                searchCallback={this.setSearchResults}
                alertCallback={this.setStateAlert}
              />
            </Row>
            {body}
          </Container>
        </div>
      </DocumentTitle>
    );
  }
}

export default Search;
