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
    var page = this.state.page;
    var start = (page - 1) * 6;
    return this.props.cards.slice(start, start + 3);
  };

  getSecondRow = () => {
    var page = this.state.page;
    var start = (page - 1) * 6;
    return this.props.cards.slice(start + 3, start + 6);
  };

  changePage = value => {
    this.setState({ page: value });
    console.log(value);
  };

  renderPaginationItems = () => {
    var length = this.props.cards.length;
    var numPageItems = Math.ceil(length / 6);
    let numArr = [];

    for (var i = 1; i <= numPageItems; i++) {
      numArr.push(i);
    }

    return numArr.map(i => (
      <PaginationItem key={i}>
        <PaginationLink onClick={() => this.changePage(i)}>{i}</PaginationLink>
      </PaginationItem>
    ));
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
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              {this.renderPaginationItems()}
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Row>
        </Container>
      </div>
    );
  }
}

Catalog.defaultProps = {
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
  ],
  pages: [
    {
      page: 1
    },
    {
      page: 2
    },
    {
      page: 3
    }
  ]
};

export default Catalog;
