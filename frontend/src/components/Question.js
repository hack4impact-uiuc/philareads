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

  //changes state to indicate when to show correct answer
  renderAnswer = () => {
    if (this.state.showCorrect === true) {
      return (
        <p>correct answer: {this.props.options[this.props.correctAnswer]}</p>
      );
    } else {
      return <br />;
    }
  };

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

  renderQuestion = () => {
    return (
      <div>
        <Card>
          <h3>{this.props.title}</h3>
          <Form>
            <ListGroup>
              {this.props.options.map((option, i) => {
                return this.renderInput(i, option);
              })}
            </ListGroup>
          </Form>
          {this.renderAnswer()}
        </Card>
      </div>
    );
  };

  submitClick = () => {
    if (this.state.showCorrect === false && this.state.selectedAnswer !== -1) {
      //and an option is clicked
      this.setState({
        showCorrect: true,
        submitted: true
      });
    }
  };

  render() {
    return (
      <div>
        {this.renderQuestion()}
        <Button outline onClick={() => this.submitClick()}>
          Submit
        </Button>
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
