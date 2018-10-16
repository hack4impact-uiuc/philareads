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

class Catalog extends Component {
  state = {
    page: 1
  };

  getFirstRow = () => {
    return this.props.cards.slice(0, 3);
  };

  getSecondRow = () => {
    return this.props.cards.slice(3, 6);
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
    }
  ]
};

export default Catalog;
