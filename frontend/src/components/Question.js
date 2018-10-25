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

  renderAnswer = () => {
    if (this.state.showCorrect === true) {
      return (
        <p>correct answer: {this.props.options[this.props.correctAnswer]}</p>
      );
    } else {
      return <br />;
    }
  };

  renderQuestion = () => {
    return (
      <Card>
        <h3>{this.props.title}</h3>
        <Form>
          <ListGroup>
            {this.props.options.map((option, i) => {
              return (
                <ListGroupItem>
                  <FormGroup check>
                    <Label check>
                      <Input
                        key={i}
                        onClick={() => this.setState({ selectedAnswer: i })}
                        type="radio"
                        name="radio1"
                      />
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
