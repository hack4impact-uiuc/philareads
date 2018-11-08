import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from 'reactstrap';
import CatalogCard from './CatalogCard';
import PropTypes from 'prop-types';
import Filter from './Filter';

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
      <Row>
        <Col lg="4">
          <div className="filter">
            <Filter />
          </div>
        </Col>
        <Col lg="8">
          <div className="results">
            <Card>
              <CardBody>
                <CardTitle>Search Results</CardTitle>
                {this.renderResults()}
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;
