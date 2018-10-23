import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';

class Question extends Component {
  renderQuestion = () => {
    return (
      <Card>
        <h3>{this.props.title}</h3>
        <ListGroup>
          {this.props.options.map((option, i) => {
            return (
              <ListGroupItem action color="">
                {option}
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <p>correct answer: {this.props.options[this.props.correctAnswer]}</p>
      </Card>
    );
  };

  render() {
    return <div>{this.renderQuestion()}</div>;
  }
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.number.isRequired
};

export default Question;
