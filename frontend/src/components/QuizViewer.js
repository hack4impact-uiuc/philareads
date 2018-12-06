import React, { Component } from 'react';
import Question from '../components/Question';
import {
  Button,
  Progress,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

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
      currentQuestion: 0,
      answered: 0
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

  renderProgress = () => {
    let value = (this.state.answered / this.props.questionList.length) * 100;
    return (
      <div container="text-center">
        <h3 style={{ textAlign: 'center' }}>Quiz Progress</h3>
        <div style={{ alignItems: 'inline' }}>
          <Progress color="success" value={value} />
          {this.renderRedoButton()}
        </div>
      </div>
    );
  };

  renderRedoButton = () => {
    let color = '';
    if (this.props.redoable === true) {
      color = 'success';
    } else {
      color = 'secondary';
    }
    return (
      <Button color={color} onClick={this.props.redoQuiz}>
        Redo
      </Button>
    );
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.questionProps !== this.state.questionProps) {
      let numSubmittedTrue = 0;
      this.state.questionProps.map(question => {
        if (question.submitted === true) {
          numSubmittedTrue++;
        }
      });
      this.setState({
        answered: numSubmittedTrue
      });
    }
    if (prevProps.numRedo !== this.props.numRedo) {
      this.setState({
        questionProps: this.props.questionList.map(question => {
          return {
            selectedAnswer: -1,
            submitted: false,
            answeredCorrectly: -1
          };
        }),
        currentQuestion: 0
      });
    }
  }

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

        <br />
        {this.renderProgress()}

        {this.props.questionList.length > 0 && (
          <div className="pagination">
            <Pagination size="lg" aria-label="Question navigation">
              {this.renderPaginationPrev()}
              {this.props.questionList.map((question, i) => (
                <PaginationItem key={`${this.props.quizID},${i}`}>
                  <PaginationLink
                    className={
                      this.state.currentQuestion === i
                        ? 'pagination-current'
                        : ''
                    }
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
