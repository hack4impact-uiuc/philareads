import React, { Component } from 'react';
import { URLParamToString } from '../utils/formatHelpers';
import '../styles/BookInfo.scss';
import book from '../images/book-fa.png';
class BookInfo extends Component {
  render() {
    return (
      <div className="blue-gradient book-info">
        <div className="container">
          <div className="row book-info-row  font-white">
            <div className="col-lg-3 col-md-6">
              {this.props.bookObject.cover_url !== undefined &&
              this.props.bookObject.cover_url !== null &&
              this.props.bookObject.cover_url !== '' ? (
                <img
                  alt="Book cover cannot be displayed"
                  className="book-cover img-fluid"
                  src={this.props.bookObject.cover_url}
                />
              ) : (
                <img
                  className="img-fluid d-none d-md-block"
                  src={book}
                  alt=""
                />
              )}
            </div>
            <div className="col-lg-9 col-md-6">
              <h1 className="book-title">{this.props.bookObject.name}</h1>
              <h3 className="light-font book-author">
                By {this.props.bookObject.author}
              </h3>

              <h3 className="light-font book-year">
                <b>{`Reading Olympics ${this.props.bookObject.year}`}</b>
              </h3>
              <h3 className="light-font book-grade">
                <b>{`${URLParamToString(this.props.bookObject.grade)}`}</b>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
