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
import memoize from 'memoize-one';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      years: []
    };
  }

  collectGrades = memoize(books => {
    let gradeSet = new Set();
    books.map(book => gradeSet.add(book.grade));
    let gradeArr = Array.from(gradeSet);

    // sort in descending order
    gradeArr.sort((a, b) => b - a);
    return gradeArr;
  });

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
    const gradeArr = this.collectGrades(this.props.results);
    return (
      <Row>
        <Col lg="4">
          <div className="filter">
            <Filter gradeArr={gradeArr} />
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
