import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { Form, FormGroup, Input } from 'reactstrap';

class QuestionList extends Component {
  render() {
    return (
      <div>
        {this.props.questions.map((question, i) => {
          return <Question key={i} {...question} />;
        })}
      </div>
    );
  }
}

QuestionList.propTypes = {
  /* Verify that questions follows the following schema
    questions = [
        {
            title: ...
            options: ...
            correctAnswers ...
        },
        ...
    ]
    */
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.number.isRequired
    })
  ).isRequired
};

export default QuestionList;
