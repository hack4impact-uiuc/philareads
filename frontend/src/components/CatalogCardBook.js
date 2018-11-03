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

const defaultImageSrc =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Book_font_awesome.svg/2000px-Book_font_awesome.svg.png';

class CatalogCardBook extends Component {
  render() {
    // TODO Should be able to click year/grade to go to that page? Or is that too confusing?
    const { book, onClickBook } = this.props;

    return (
      <Card>
        <CardBody>
          <CardImg
            src={book.imageSrc || defaultImageSrc}
            onClick={onClickBook}
            alt=""
          />
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
