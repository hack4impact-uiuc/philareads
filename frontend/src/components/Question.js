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
      selectedAnswer: -1 //possible answer choices: 0 to last answer
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

  returnColor = () => {
    //function is functional; logic isn't right
    console.log(this.state.selectedAnswer);
    console.log(this.props.correctAnswer);

    if (this.state.showCorrect === true) {
      if (
        this.state.selectedAnswer >= 0 &&
        this.state.selectedAnswer < this.props.options.length
      ) {
        if (this.state.selectedAnswer === this.props.correctAnswer) {
          return 'success';
        }
      }
    }
    return '';
  };

  renderInput = i => {
    if (this.state.showCorrect === true) {
      return (
        <Input
          key={i}
          onClick={() => this.setState({ selectedAnswer: i })}
          // onClick={()=>this.selectAnswer()} //with the selectAnswer() that doesn't work
          type="radio"
          name="radio1"
          disabled
          color="danger"
        />
      );
    }
    return (
      <Input
        key={i}
        onClick={() => this.setState({ selectedAnswer: i })}
        type="radio"
        name="radio1"
      />
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
                return (
                  <ListGroupItem color={this.returnColor()}>
                    <FormGroup check>
                      <Label check>
                        {/* <Input
                          key={i}
                          onClick={() => this.setState({ selectedAnswer: i })}
                          // onClick={()=>this.selectAnswer()} //with the selectAnswer() that doesn't work
                          type="radio"
                          name="radio1"
                        /> */}
                        {this.renderInput(i)}
                        {/* <Input key={i} type="radio" name="radio1" /> */}
                        {option}
                      </Label>
                    </FormGroup>
                  </ListGroupItem>
                );
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
        showCorrect: true
      });
    }
  };

  // not correctly update state to key
  // selectAnswer = (e) => {
  //   this.setState({
  //     selectedAnswer: e.target.key
  //   })
  // }

  // this one doesnt work
  // selectAnswer(event) {
  //   this.setState({
  //     selectedAnswer: event.target.key
  //   })
  // }

  /* example for ^^^^^^ selectAnswer()
    handleChange(event) {
      this.setState({
        size: event.target.value
      });
    }
  */

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
