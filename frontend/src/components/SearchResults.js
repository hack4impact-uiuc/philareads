import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
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

  collectYears = memoize(books => {
    let yearSet = new Set();
    books.map(book => yearSet.add(book.year));
    let yearArr = Array.from(yearSet);

    // sort in descending order
    yearArr.sort((a, b) => b - a);
    return yearArr;
  });

  renderResults = () => {
    return this.props.results.map(book => {
      return (
        <Card key={book.id} className="search-result">
          <CardBody>
            <CardTitle>{book.name}</CardTitle>
            <CardText>{`${book.author}, ${book.grade}, ${book.year}`}</CardText>
          </CardBody>
          <Link to={`/ReadingOlympics/book/${book.id}`}>
            <span />
          </Link>
        </Card>
      );
    });
  };

  render() {
    const gradeArr = this.collectGrades(this.props.results);
    const yearArr = this.collectYears(this.props.results);
    return (
      <Row>
        <Col lg="4">
          <div className="filter">
            <Filter gradeArr={gradeArr} yearArr={yearArr} />
          </div>
        </Col>
        <Col lg="8">
          <div className="results">
            <Card>
              <CardBody>
                <h4>Search Results</h4>
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
