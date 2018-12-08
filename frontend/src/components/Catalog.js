import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import CatalogCard from './CatalogCard';
import '../styles/Catalog.scss';

class Catalog extends Component {
  state = {
    page: 1
  };

  getFirstRow = () => {
    let start = (this.state.page - 1) * this.props.cardsPerPage;
    return this.props.cards.slice(start, start + this.props.cardsPerRow);
  };

  getSecondRow = () => {
    let start = (this.state.page - 1) * this.props.cardsPerPage;
    return this.props.cards.slice(
      start + this.props.cardsPerRow,
      start + this.props.cardsPerPage
    );
  };

  getNumPageItems = () => {
    let length = this.props.cards.length;
    return Math.ceil(length / this.props.cardsPerPage);
  };

  changePage = value => {
    this.setState({ page: value });
  };

  changePagePrev = () =>
    this.setState(state => {
      return { page: state.page === 1 ? state.page : state.page - 1 };
    });

  changePageNext = () =>
    this.setState(state => {
      return {
        page:
          state.page === this.getNumPageItems() ? state.page : state.page + 1
      };
    });

  renderPaginationItems = () => {
    let numArr = [];

    for (let i = 1; i <= this.getNumPageItems(); i++) {
      numArr.push(i);
    }

    return numArr.map(i => (
      <PaginationItem key={i}>
        <PaginationLink
          className={this.state.page === i ? 'pagination-current' : ''}
          onClick={() => this.changePage(i)}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  renderPaginationPrev = () => {
    return (
      <PaginationItem>
        <PaginationLink previous onClick={() => this.changePagePrev()} />
      </PaginationItem>
    );
  };

  renderPaginationNext = () => {
    return (
      <PaginationItem>
        <PaginationLink next onClick={() => this.changePageNext()} />
      </PaginationItem>
    );
  };

  renderCard = card => {
    return (
      <Col lg="4" key={card.id}>
        {this.props.renderFunc ? (
          this.props.renderFunc(card)
        ) : (
          <CatalogCard
            title={card.title}
            subtitle={card.subtitle}
            text={card.text}
            onClickTitle={card.onClickTitle}
          />
        )}
      </Col>
    );
  };

  render() {
    return (
      <div>
        <Container
          fluid={true}
          className={
            'catalog' +
            (this.props.className !== undefined
              ? ' ' + this.props.className
              : '')
          }
        >
          <Row>{this.getFirstRow().map(this.renderCard)}</Row>
          <Row>{this.getSecondRow().map(this.renderCard)}</Row>
          <Row className="pagination">
            <Pagination size="lg" aria-label="Page navigation example">
              {this.renderPaginationPrev()}
              {this.renderPaginationItems()}
              {this.renderPaginationNext()}
            </Pagination>
          </Row>
        </Container>
      </div>
    );
  }
}

Catalog.defaultProps = {
  cardsPerRow: 3,
  cardsPerPage: 6,
  cards: [
    {
      id: 1,
      title: 'title',
      subtitle: 'subtitle',
      text: 'text'
    },
    {
      id: 2,
      title: 'title2',
      subtitle: 'subtitle2',
      text: 'text2'
    },
    {
      id: 3,
      title: 'title3',
      subtitle: 'subtitle3',
      text: 'text3'
    },
    {
      id: 4,
      title: 'title4',
      subtitle: 'subtitle4',
      text: 'text4'
    },
    {
      id: 5,
      title: 'title5',
      subtitle: 'subtitle5',
      text: 'text5'
    },
    {
      id: 6,
      title: 'title6',
      subtitle: 'subtitle6',
      text: 'text6'
    },
    {
      id: 7,
      title: 'title7',
      subtitle: 'subtitle7',
      text: 'text7'
    }
  ]
};

Catalog.propTypes = {
  cardsPerRow: PropTypes.number,
  cardsPerPage: PropTypes.number,
  cards: PropTypes.array.isRequired,
  renderFunc: PropTypes.func
};

export default Catalog;
