import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import CatalogCard from './CatalogCard';
import PropTypes from 'prop-types';

class SearchResults extends Component {
  renderResults = () => {
    return this.props.results.map(x => (
      <CatalogCard
        key={x.id}
        title={x.name}
        text={`${x.author}, ${x.grade}, ${x.year}`}
      />
    ));
  };
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Search Results</CardTitle>
          <CardText>List of books outputted from search</CardText>
          {this.renderResults()}
        </CardBody>
      </Card>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;
