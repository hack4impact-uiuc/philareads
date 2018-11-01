import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/BookInfo.scss';
import { Card, CardTitle, CardImg } from 'reactstrap';

class BookInfo extends Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col col-md-12">
            <Card>
              <CardTitle id="card-title">
                {this.props.bookObject.name} - {this.props.bookObject.author}
              </CardTitle>
              <CardImg
                alt="cannot be displayed"
                className="book-cover img-thumbnail"
                src={this.props.bookObject.cover_url}
              />
            </Card>

            <h3>Grade: {this.props.bookObject.grade}</h3>
            <h3>Year: {this.props.bookObject.year}</h3>
            <h3>
              Click <a href={this.props.bookObject.reader_url}>here</a> to
              download the book!
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
