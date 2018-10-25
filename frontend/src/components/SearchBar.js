import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="searchBar" className="mr-sm-2">
            Search
          </Label>
          <Input
            type="search"
            name="search"
            id="searchBar"
            placeholder="Search for a book..."
            bsSize="lg"
          />
        </FormGroup>
      </Form>
    );
  }
}
export default SearchBar;
