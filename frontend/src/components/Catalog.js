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
      return { page: state.page == 1 ? state.page : state.page - 1 };
    });

  changePageNext = () =>
    this.setState(state => {
      return {
        page: state.page == this.getNumPageItems() ? state.page : state.page + 1
      };
    });

  renderPaginationItems = () => {
    let numArr = [];

    for (let i = 1; i <= this.getNumPageItems(); i++) {
      numArr.push(i);
    }

    return numArr.map(i => (
      <PaginationItem key={i}>
        <PaginationLink onClick={() => this.changePage(i)}>{i}</PaginationLink>
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

  render() {
    return (
      <div>
        <Container fluid={true}>
          <Row>
            {this.getFirstRow().map(x => (
              <Col lg="4">
                <CatalogCard
                  title={x.title}
                  subtitle={x.subtitle}
                  text={x.text}
                />
              </Col>
            ))}
          </Row>
          <Row>
            {this.getSecondRow().map(x => (
              <Col lg="4">
                <CatalogCard
                  title={x.title}
                  subtitle={x.subtitle}
                  text={x.text}
                />
              </Col>
            ))}
          </Row>
          <Row>
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
      title: 'title',
      subtitle: 'subtitle',
      text: 'text'
    },
    {
      title: 'title2',
      subtitle: 'subtitle2',
      text: 'text2'
    },
    {
      title: 'title3',
      subtitle: 'subtitle3',
      text: 'text3'
    },
    {
      title: 'title4',
      subtitle: 'subtitle4',
      text: 'text4'
    },
    {
      title: 'title5',
      subtitle: 'subtitle5',
      text: 'text5'
    },
    {
      title: 'title6',
      subtitle: 'subtitle6',
      text: 'text6'
    },
    {
      title: 'title7',
      subtitle: 'subtitle7',
      text: 'text7'
    }
  ]
};

Catalog.propTypes = {
  cardsPerRow: PropTypes.number,
  cardsPerPage: PropTypes.number,
  cards: PropTypes.array.isRequired
};

export default Catalog;
