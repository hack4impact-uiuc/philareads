import React, { Component } from 'react';
import { URLParamToString } from '../utils/formatHelpers';
import '../styles/BookInfo.scss';

class BookInfo extends Component {
  render() {
    return (
      <div className="blue-gradient book-info">
        <div className="container">
          <div className="row book-info-row  font-white">
            <div className="col col-lg-3">
              {undefined && (
                <img
                  alt="cannot be displayed"
                  className="book-cover img-fluid"
                  src={this.props.bookObject.cover_url}
                />
              )}
            </div>
            <div>
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
