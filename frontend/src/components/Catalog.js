import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Catalog extends Component {
  state = {
    page: 1
  };

  getFirstRow = () => {
    let start = (this.state.page - 1) * this.props.cards_per_page;
    return this.props.cards.slice(start, start + this.props.cards_per_row);
  };

  getSecondRow = () => {
    let start = (this.state.page - 1) * this.props.cards_per_page;
    return this.props.cards.slice(
      start + this.props.cards_per_row,
      start + this.props.cards_per_page
    );
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
      let length = this.props.cards.length;
      let numPageItems = Math.ceil(length / this.props.cards_per_page);
      return { page: state.page == numPageItems ? state.page : state.page + 1 };
    });

  renderPaginationItems = () => {
    let length = this.props.cards.length;
    let numPageItems = Math.ceil(length / this.props.cards_per_page);
    let numArr = [];

    for (let i = 1; i <= numPageItems; i++) {
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
                <Card>
                  <CardBody>
                    <CardTitle>{x.title}</CardTitle>
                    <CardSubtitle>{x.subtitle}</CardSubtitle>
                    <CardText>{x.text}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            {this.getSecondRow().map(x => (
              <Col lg="4">
                <Card>
                  <CardBody>
                    <CardTitle>{x.title}</CardTitle>
                    <CardSubtitle>{x.subtitle}</CardSubtitle>
                    <CardText>{x.text}</CardText>
                  </CardBody>
                </Card>
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
  cards_per_row: 3,
  cards_per_page: 6,
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

export default Catalog;
