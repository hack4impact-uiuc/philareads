import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

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
  questions: PropTypes.arrayOf(propValue => {
    let checkFailed = false;
    propValue.forEach(question => {
      // Verify existence of certain properties
      if (
        !(
          'title' in question &&
          'options' in question &&
          'correctAnswer' in question
        )
      ) {
        console.log('hi');
        checkFailed = true;
      }
    });
    if (checkFailed) {
      return new Error();
    }
  }).isRequired
};

export default QuestionList;
