import React, { Component } from 'react';
import Catalog from '../../components/Catalog';
import CatalogCardBook from '../../components/CatalogCardBook';
import '../../styles/ReadingOlympics.scss';
import { getBooksByYearGrade } from '../../utils/api';
import {
  URLParamToString,
  URLParamToQueryParam
} from '../../utils/formatHelpers';

class ROYearGradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    };
  }

  componentDidMount() {
    const { year, grade } = this.props.match.params;
    getBooksByYearGrade({ year, grade: URLParamToQueryParam(grade) }).then(
      resJson => {
        if (resJson.success) {
          this.setState({
            books: resJson.result.results
          });
        } else {
          console.log(resJson.message);
        }
      }
    );
  }

  onClickBook = bookId => {
    this.props.history.push(`/ReadingOlympics/book/${bookId}`);
  };

  renderCatalogCardBook = book => {
    const onClick = () => this.onClickBook(book.id);
    return <CatalogCardBook book={book} onClickBook={onClick} />;
  };

  render() {
    return (
      <div className="reading-olympics">
        <div className="page-title">
          <h1>{`Reading Olympics: ${URLParamToString(
            this.props.match.params.grade
          )} ${this.props.match.params.year}`}</h1>
        </div>
        {this.state.books && (
          <Catalog
            cards={this.state.books}
            renderFunc={this.renderCatalogCardBook}
          />
        )}
      </div>
    );
  }
}

export default ROYearGradeView;
