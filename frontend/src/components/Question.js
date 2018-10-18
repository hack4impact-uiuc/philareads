import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul>
          {this.props.options.map((option, i) => {
            return <li key={i}>{option}</li>;
          })}
        </ul>
        <p>correct answer: {this.props.options[this.props.correctAnswer]}</p>
      </div>
    );
  }
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.number.isRequired
};

export default Question;
