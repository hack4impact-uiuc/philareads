import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import CatalogCard from './CatalogCard';

class SearchResults extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Search Results</CardTitle>
          <CardText>List of books outputted from search</CardText>
          <CatalogCard title="Winnie the Pooh 1" text="Author, Grade, Year" />
          <CatalogCard title="Winnie the Pooh 2" text="Author, Grade, Year" />
        </CardBody>
      </Card>
    );
  }
}

export default SearchResults;
