import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

class RedirectingSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.history.push(`/search?query=${this.state.query}`);
    }
  };

  render() {
    return (
      <div class="flex-container">
        <FontAwesomeIcon className="sm-search-icon" icon="search" size="1x" />
        <Input
          type="text"
          placeholder="Search for a book..."
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default RedirectingSearchBar;
