import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  // getInfo = () => {
  //   // TODO: api call
  // };

  search = () => {
    console.log('searching');
  };

  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="searchBar" className="mr-sm-2">
            Search
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
                this.search();
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
