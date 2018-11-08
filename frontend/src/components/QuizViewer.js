import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Question from '../components/Question';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class QuizViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0
    };
  }
  getQuestionObject() {
    return this.props.questionList[this.state.currentQuestion];
  }
  render() {
    return (
      <div>
        {this.props.questionList.length > 0 && (
          <Question
            key={`${this.props.quizID},${this.state.currentQuestion}`}
            title={this.getQuestionObject()['text']}
            options={this.getQuestionObject()['options']}
            correctAnswer={this.getQuestionObject()['options'].indexOf(
              this.getQuestionObject()['correct_option']
            )}
          />
        )}

        {this.props.questionList.length > 0 && (
          <Pagination aria-label="Page navigation example">
            {this.props.questionList.map((question, i) => (
              <PaginationItem size="lg" key={`${this.props.quizID},${i}`}>
                <PaginationLink
                  onClick={() => this.setState({ currentQuestion: i })}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        )}
      </div>
    );
  }
}

export default QuizViewer;
