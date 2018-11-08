import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Question from '../components/Question';
class QuizViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: -1
    };
  }

  render() {
    return (
      <div>
        {this.props.questionList.map((question, i) => {
          const correctAnswer = question['options'].indexOf(
            question['correct_option']
          );
          console.log('Hi');
          return (
            <Question
              key={`${this.props.quizID},${i}`}
              title={question['text']}
              options={question['options']}
              correctAnswer={correctAnswer}
            />
          );
        })}
      </div>
    );
  }
}

export default QuizViewer;
