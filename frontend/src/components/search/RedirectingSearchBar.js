import React, { Component } from 'react';
import AutoComplete from '../search/AutoComplete';

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
      <AutoComplete
        suggestions={[
          'cat in the hat',
          'mouse on a motorcycle',
          'dog in the house',
          'Serafina and the Black Cloak'
        ]}
      />
      // <Input
      //   type="text"
      //   placeholder="Search for a book..."
      //   onChange={this.handleChange}
      //   onKeyPress={this.handleKeyPress}
      // />
    );
  }
}

export default RedirectingSearchBar;
