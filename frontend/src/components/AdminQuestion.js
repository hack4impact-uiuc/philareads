import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);
class AdminQuestion extends Component {
  handleCorrectAnswer = (e, idx) => {
    e.preventDefault();
    var questionCopy = this.props.question;
    questionCopy['correct_option'] = this.props.question.options[idx];
    questionCopy['correct_option_idx'] = idx;
    this.props.changeHandler(questionCopy, this.props.indexInQuestionArray);
  };

  handleChange = e => {
    var questionCopy = this.props.question;
    // if(this.props.question['options'] === undefined){
    //   this.props.question['options'] = ["","","",""]
    // }
    switch (e.target.name) {
      case 'option-a-input':
        questionCopy['options'][0] = e.target.value;
        break;
      case 'option-b-input':
        questionCopy['options'][1] = e.target.value;
        break;
      case 'option-c-input':
        questionCopy['options'][2] = e.target.value;
        break;
      case 'option-d-input':
        questionCopy['options'][3] = e.target.value;
        break;
      default:
        questionCopy[e.target.name] = e.target.value;
    }
    if (questionCopy['correct_option_idx'] > -1) {
      // If the there's a correct option set, update the value

      questionCopy['correct_option'] =
        questionCopy['options'][questionCopy['correct_option_idx']];
      console.log(questionCopy['options'][questionCopy['correct_option_idx']]);
    }
    this.props.changeHandler(questionCopy, this.props.indexInQuestionArray);
  };
  deleteQuestion = () => {
    this.props.questionDeleteHandler(this.props.indexInQuestionArray);
  };
  render() {
    return (
      <div>
        <div className="question-form">
          <FontAwesomeIcon
            className="times-icon fa-15x"
            icon="times"
            onClick={this.deleteQuestion}
          />
          <FormGroup>
            <Label>Question</Label>

            <Input
              type="text"
              name="text"
              placeholder="Ex: Who is Huck Finn's best friend?"
              onChange={this.handleChange}
              value={this.props.question.text}
            />
          </FormGroup>

          <FormGroup inline={true}>
            <Label>Options</Label>
            <Row>
              <Col lg="9" className="option-col">
                <Input
                  type="text"
                  className="quiz-option"
                  name="option-a-input"
                  placeholder="Option A"
                  onChange={this.handleChange}
                  value={this.props.question.options[0]}
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.props.question['correct_option_idx'] === 0
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 0)}
                >
                  {this.props.question['correct_option_idx'] === 0
                    ? 'Correct Answer'
                    : 'Mark Correct'}
                </Button>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup inline={true}>
            <Row>
              <Col lg="9" className="option-col">
                <Input
                  type="text"
                  className="quiz-option"
                  name="option-b-input"
                  placeholder="Option B"
                  onChange={this.handleChange}
                  value={this.props.question.options[1]}
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.props.question['correct_option_idx'] === 1
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 1)}
                >
                  {this.props.question['correct_option_idx'] === 1
                    ? 'Correct Answer'
                    : 'Mark Correct'}
                </Button>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup inline={true}>
            <Row>
              <Col lg="9" className="option-col">
                <Input
                  type="text"
                  className="quiz-option"
                  name="option-c-input"
                  placeholder="Option C"
                  onChange={this.handleChange}
                  value={this.props.question.options[2]}
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.props.question['correct_option_idx'] === 2
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 2)}
                >
                  {this.props.question['correct_option_idx'] === 2
                    ? 'Correct Answer'
                    : 'Mark Correct'}
                </Button>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup inline={true}>
            <Row>
              <Col lg="9" className="option-col">
                <Input
                  type="text"
                  className="quiz-option"
                  name="option-d-input"
                  placeholder="Option D"
                  onChange={this.handleChange}
                  value={this.props.question.options[3]}
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.props.question['correct_option_idx'] === 3
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 3)}
                >
                  {this.props.question['correct_option_idx'] === 3
                    ? 'Correct Answer'
                    : 'Mark Correct'}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default AdminQuestion;
