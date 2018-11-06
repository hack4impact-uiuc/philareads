import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { URLParamToString } from '../utils/formatHelpers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import '../styles/ReadingOlympics.scss';

library.add(faBook);

class CatalogCardBook extends Component {
  renderBookImage = () => {
    const { onClickBook } = this.props;
    const { imageSrc } = this.props.book;
    if (imageSrc === undefined || imageSrc === null || imageSrc === '') {
      return (
        <div className="book-image">
          <FontAwesomeIcon className="book-icon" icon="book" size="8x" />
        </div>
      );
    }

    return <CardImg src={imageSrc} onClick={onClickBook} alt="" />;
  };

  render() {
    // TODO Should be able to click year/grade to go to that page? Or is that too confusing?
    const { book, onClickBook } = this.props;

    return (
      <Card>
        <CardBody>
          {this.renderBookImage()}
          <CardTitle onClick={onClickBook}>
            {`${book.name} by ${book.author}`}
          </CardTitle>
          <CardSubtitle>{`${URLParamToString(book.grade)}, ${
            book.year
          } Reading Olympics`}</CardSubtitle>
          <CardText>{book.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

CatalogCardBook.propTypes = {
  onClickBook: PropTypes.func
};

export default CatalogCardBook;
