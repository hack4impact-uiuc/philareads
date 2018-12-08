import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

class CatalogCard extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          {this.props.subtitle !== '' && (
            <CardSubtitle>{this.props.subtitle}</CardSubtitle>
          )}
          <CardText>{this.props.text}</CardText>
        </CardBody>
      </Card>
    );
  }
}

CatalogCard.defaultProps = {
  subtitle: ''
};

CatalogCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default CatalogCard;
