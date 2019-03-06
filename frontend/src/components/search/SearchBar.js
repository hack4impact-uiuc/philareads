import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { search } from '../../utils/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.initialQuery.trim()
    };
  }

  componentDidUpdate(prevProps) {
    const propQuery = this.props.initialQuery.trim();
    if (propQuery !== prevProps.initialQuery.trim()) {
      const callbackFunc =
        propQuery === ''
          ? this.props.resetCallback
          : () => this.handleSearch(false);
      this.setState({ query: propQuery }, callbackFunc);
    }
  }

  componentDidMount() {
    if (this.state.query.trim() !== '') {
      // Setting results to something prevents the "Perform a search!" screen from flashing
      const emptyResults = [];
      this.props.searchCallback(emptyResults);
      this.handleSearch(false);
    }
  }

  handleSearch = async (showLoadingState = true) => {
    const query = this.state.query.trim();

    if (query === '') {
      return;
    }

    if (showLoadingState) {
      this.props.loadCallback(query);
    }

    const {
      success,
      result: { results },
      message
    } = await search(query);

    if (success) {
      if (results.length === 0) {
        this.props.notFoundCallback();
      } else {
        this.props.searchCallback(results);
      }
    } else {
      this.props.alertCallback(message);
    }
  };

  render() {
    return (
      <Form inline className="searchbar">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="searchBar">
            <FontAwesomeIcon
              className="sm-search-icon"
              icon="search"
              size="1x"
            />
          </Label>
          <Input
            type="text"
            bsSize="lg"
            placeholder="Search for a book..."
            onChange={event => {
              this.setState({ query: event.target.value });
            }}
            value={this.state.query}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSearch();
              }
            }}
          />
        </FormGroup>
      </Form>
    );
  }
}

SearchBar.propTypes = {
  resetCallback: PropTypes.func.isRequired,
  loadCallback: PropTypes.func.isRequired,
  notFoundCallback: PropTypes.func.isRequired,
  searchCallback: PropTypes.func.isRequired,
  alertCallback: PropTypes.func.isRequired
};

export default SearchBar;
