import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { search } from '../utils/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleSearch = async () => {
    // dummy data for search Results
    // this.props.searchCallback([
    //   {
    //     name: "asl",
    //     author: "asl",
    //     grade: 1,
    //     year: 1
    //   },
    //   {
    //     name: "asl",
    //     author: "asl",
    //     grade: 1,
    //     year: 1
    //   }
    // ]);
    const { success, result, message } = await search(this.state.query);

    if (success) {
      this.props.searchCallback(result);
    } else {
      console.log(message);
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
  searchCallback: PropTypes.func.isRequired
};

export default SearchBar;
