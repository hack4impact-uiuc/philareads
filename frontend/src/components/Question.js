import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Form,
  Button
} from 'reactstrap';

class Question extends Component {
  /**
   * @returns HTML Component
   * shows correct answer when answer has been submitted
   */
  renderAnswer = () => {
    if (this.props.submitted) {
      return (
        <p>Correct answer: {this.props.options[this.props.correctAnswer]}</p>
      );
    } else {
      return <br />;
    }
  };

  /**
   * @return string color
   * color only shows after a valid submission occurs, showing the
   * incorrect and correct options.
   * danger = red = incorrect
   * success = green = correct
   * @param i           index of possible answer option
   */
  returnColor = i => {
    let color = '';
    if (this.props.selectedAnswer !== -1 && this.props.submitted) {
      if (
        i === this.props.selectedAnswer &&
        this.props.selectedAnswer === this.props.correctAnswer
      ) {
        color = 'success';
      } else if (
        i === this.props.selectedAnswer &&
        this.props.selectedAnswer !== this.props.correctAnswer
      ) {
        color = 'danger';
      } else if (i === this.props.correctAnswer) {
        color = 'success';
      }
    }
    return color;
  };

  /**
   * @returns ListGroupItem
   * each ListGroupItem contains a radio button element with matching
   * text, function, and correctness coloring after submission
   * @param i           index of answer choice
   * @param option      the text of answer choice
   */
  renderInput = (i, option) => {
    let input = (
      <Input
        key={i}
        onChange={() => this.props.setQuestionProps({ selectedAnswer: i })}
        type="radio"
        name="options"
        checked={this.props.selectedAnswer === i}
        disabled={this.props.submitted}
      />
    );

    return (
      <ListGroupItem key={i} color={this.returnColor(i)}>
        <FormGroup check>
          <Label check>
            {input}
            {option}
          </Label>
        </FormGroup>
      </ListGroupItem>
    );
  };

  /**
   * @returns HTML Component
   * question component with just its question title, options as clickable
   * radio buttons, and correct answer together
   */
  renderQuestion = () => {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form>
          <ListGroup>
            {this.props.options.map((option, i) => {
              return this.renderInput(i, option);
            })}
          </ListGroup>
        </Form>
        {this.renderAnswer()}
      </div>
    );
  };

  /**
   * void function
   * controls when to show result of user's chosen answer and the correct answer
   * sets correctness of this question's answer choice
   */
  submitClick = () => {
    if (!this.props.submitted && this.props.selectedAnswer !== -1) {
      let answeredCorrectly;
      if (this.props.selectedAnswer === this.props.correctAnswer) {
        answeredCorrectly = 1;
      } else {
        answeredCorrectly = 0;
      }
      this.props.setQuestionProps({
        submitted: true,
        answeredCorrectly: answeredCorrectly
      });
    }
  };

  getButtonColor = () => {
    let color = 'secondary';
    if (!this.props.submitted && this.props.selectedAnswer !== -1) {
      color = 'primary';
    }
    return color;
  };

  /**
   * @returns a Card component
   * the Card component contains the question and button
   */
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            {this.renderQuestion()}
            <Button
              disabled={this.props.submitted}
              outline={this.props.submitted}
              color={this.getButtonColor()}
              onClick={this.submitClick}
              className="submit-question"
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.number.isRequired,
  setQuestionProps: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.number.isRequired, //possible answer choices: 0 to last answer
  submitted: PropTypes.bool.isRequired,
  answeredCorrectly: PropTypes.number.isRequired //default is unanswered; 0 incorrect; 1 correct
};

export default Question;
