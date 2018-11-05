import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/BookInfo.scss';
import { Card, CardTitle, CardImg } from 'reactstrap';

class BookInfo extends Component {
  render() {
    return (
      <div className="blue-gradient">
        <div className="container">
          <div className="row book-info-row  font-white">
            <div className="col col-lg-3">
              <img
                alt="cannot be displayed"
                className="book-cover img-fluid"
                src={this.props.bookObject.cover_url}
              />
            </div>
            <div className="col col-lg-6">
              <h1 className="book-title">{this.props.bookObject.name}</h1>
              <h3 className="light-font book-author">
                By <u>{this.props.bookObject.author}</u>
              </h3>

              <h3 className="light-font book-grade">
                Grade: {this.props.bookObject.grade}
              </h3>
              <h3 className="light-font book-year">
                Year: {this.props.bookObject.year}
              </h3>
              <h3 className="light-font">
                Click <a href={this.props.bookObject.reader_url}>here</a> to
                download the book!
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
