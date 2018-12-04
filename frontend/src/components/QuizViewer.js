import React, { Component } from 'react';
import Question from '../components/Question';
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class QuizViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionProps: this.props.questionList.map(question => {
        return {
          selectedAnswer: -1,
          submitted: false,
          answeredCorrectly: -1
        };
      }),
      currentQuestion: 0
    };
  }

  getQuestionObject() {
    return this.props.questionList[this.state.currentQuestion];
  }

  getQuestionProps() {
    return this.state.questionProps[this.state.currentQuestion];
  }

  setQuestionProps = stateObject => {
    const { currentQuestion } = this.state;
    this.setState(state => {
      const { questionProps } = state;
      return {
        questionProps: [
          ...questionProps.slice(0, currentQuestion),
          {
            ...questionProps[currentQuestion],
            ...stateObject
          },
          ...questionProps.slice(currentQuestion + 1)
        ]
      };
    });
  };

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
        <h1 className="quiz-title">
          {this.props.quizName}
          <Button
            outline
            color="primary"
            onClick={() => this.props.finishAttempt(this.state.questionProps)}
            className="finish-attempt"
          >
            Finish Attempt
          </Button>
        </h1>
        {this.props.questionList.length > 0 && (
          <Question
            key={`${this.props.quizID},${this.state.currentQuestion}`}
            title={this.getQuestionObject()['text']}
            options={this.getQuestionObject()['options']}
            correctAnswer={this.getQuestionObject()['options'].indexOf(
              this.getQuestionObject()['correct_option']
            )}
            setQuestionProps={this.setQuestionProps}
            selectedAnswer={this.getQuestionProps()['selectedAnswer']}
            submitted={this.getQuestionProps()['submitted']}
            answeredCorrectly={this.getQuestionProps()['answeredCorrectly']}
            questionNumber={this.state.currentQuestion + 1}
            nextPage={this.changePageNext}
            totalNumOfQuestions={this.props.questionList.length}
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
