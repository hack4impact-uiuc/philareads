import React, { Component } from 'react';
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

  changePagePrev = () =>
    this.setState(state => {
      return {
        currentQuestion:
          state.currentQuestion === 0
            ? state.currentQuestion
            : state.currentQuestion - 1
      };
    });

  changePageNext = () =>
    this.setState(state => {
      return {
        currentQuestion:
          state.currentQuestion === this.props.questionList.length - 1
            ? state.currentQuestion
            : state.currentQuestion + 1
      };
    });

  renderPaginationPrev = () => {
    return (
      <PaginationItem>
        <PaginationLink previous onClick={this.changePagePrev} />
      </PaginationItem>
    );
  };

  renderPaginationNext = () => {
    return (
      <PaginationItem>
        <PaginationLink next onClick={this.changePageNext} />
      </PaginationItem>
    );
  };

  render() {
    return (
      <div className="quiz-viewer">
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
          <div className="pagination">
            <Pagination size="lg" aria-label="Question navigation">
              {this.renderPaginationPrev()}
              {this.props.questionList.map((question, i) => (
                <PaginationItem key={`${this.props.quizID},${i}`}>
                  <PaginationLink
                    onClick={() => this.setState({ currentQuestion: i })}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {this.renderPaginationNext()}
            </Pagination>
          </div>
        )}
      </div>
    );
  }
}

export default QuizViewer;
