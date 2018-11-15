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
      gradeFilters: [],
      yearFilters: []
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

  setGradeFilters = filterEvent => {
    let grade = parseInt(filterEvent.target.parentElement.innerText);
    let gradeFilterArr = this.state.gradeFilters;
    let idx = gradeFilterArr.indexOf(grade);
    if (idx == -1) {
      gradeFilterArr.push(grade);
    } else {
      gradeFilterArr.splice(idx, 1);
    }
    this.setState({ gradeFilters: gradeFilterArr });
  };

  setYearFilters = filterEvent => {
    let year = parseInt(filterEvent.target.parentElement.innerText);
    let yearFilterArr = this.state.yearFilters;
    let idx = yearFilterArr.indexOf(year);
    if (idx == -1) {
      yearFilterArr.push(year);
    } else {
      yearFilterArr.splice(idx, 1);
    }
    this.setState({ yearFilters: yearFilterArr });
  };

  shouldDisplayBook = book => {
    const { gradeFilters, yearFilters } = this.state;
    if (gradeFilters.length !== 0 && gradeFilters.indexOf(book.grade) === -1) {
      return false;
    }
    if (yearFilters.length !== 0 && yearFilters.indexOf(book.year) === -1) {
      return false;
    }
    return true;
  };

  renderResults = () => {
    let filteredResults = this.props.results.filter(this.shouldDisplayBook);
    return filteredResults.map(book => {
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
            <Filter
              gradeArr={gradeArr}
              yearArr={yearArr}
              gradeFilterCallback={this.setGradeFilters}
              yearFilterCallback={this.setYearFilters}
            />
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
