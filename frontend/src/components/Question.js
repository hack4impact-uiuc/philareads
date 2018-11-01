import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  Form,
  Button
} from 'reactstrap';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false,
      selectedAnswer: -1, //possible answer choices: 0 to last answer,
      submitted: false
    };
  }

  /**
   * @returns HTML Component
   * controls when/what to show when an answer for the question has been submitted
   */
  renderAnswer = () => {
    if (this.state.showCorrect === true) {
      return (
        <p>correct answer: {this.props.options[this.props.correctAnswer]}</p>
      );
    } else {
      return <br />;
    }
  };

  /**
   * @return string color
   * color only shows after a valid submission occurs, showing the
   * incorrect and correct options
   * @param i           index of possible answer option
   */
  returnColor = i => {
    let color = '';
    if (this.state.selectedAnswer !== -1 && this.state.submitted) {
      if (
        i === this.state.selectedAnswer &&
        this.state.selectedAnswer === this.props.correctAnswer
      ) {
        color = 'success';
      } else if (
        i === this.state.selectedAnswer &&
        this.state.selectedAnswer !== this.props.correctAnswer
      ) {
        color = 'danger';
      } else if (i === this.props.correctAnswer) {
        color = 'success';
      }
    }
    return color;
  };

  /**
   * @returns ListGrouItem
   * each ListGroupItem tracks an individual radio button element along
   * with the text, functioning, and color after submission
   * @param i           index of possible answer choice
   * @param option      the text of possible answer choice
   */
  renderInput = (i, option) => {
    let input = (
      <Input
        key={i}
        onClick={() => this.setState({ selectedAnswer: i })}
        type="radio"
        name="radio1"
      />
    );

    if (this.state.showCorrect === true) {
      input = (
        <Input
          key={i}
          onClick={() => this.setState({ selectedAnswer: i })}
          type="radio"
          name="radio1"
          disabled
        />
      );
    }
    return (
      <ListGroupItem color={this.returnColor(i)}>
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
   * renders an incomplete question component with just its question title,
   * options as clickable radio buttons, and the correct answer as a card
   */
  renderQuestion = () => {
    return (
      <div>
        {/* <Card> */}
        <h3>{this.props.title}</h3>
        <Form>
          <ListGroup>
            {this.props.options.map((option, i) => {
              return this.renderInput(i, option);
            })}
          </ListGroup>
        </Form>
        {this.renderAnswer()}
        {/* </Card> */}
      </div>
    );
  };

  /**
   * void function
   * controlls when correct answer is shown and result of user's chosen answer
   */
  submitClick = () => {
    if (this.state.showCorrect === false && this.state.selectedAnswer !== -1) {
      this.setState({
        showCorrect: true,
        submitted: true
      });
    }
  };

  /**
   * @returns a Card component
   * the Card component represents the HTML part of the question component with a
   * button together as a card
   */
  render() {
    return (
      <div>
        <Card>
          {this.renderQuestion()}
          <Button outline onClick={() => this.submitClick()}>
            Submit
          </Button>
        </Card>
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
