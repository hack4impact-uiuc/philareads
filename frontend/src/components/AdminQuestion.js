import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);
class AdminQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswerIndex: -1
    };
  }
  handleCorrectAnswer = (e, x) => {
    e.preventDefault();
    this.setState({
      correctAnswerIndex: x
    });
  };

  deleteQuestion = () => {
    this.props.questionDeleteHandler(this.props.questionKey);
  };
  render() {
    return (
      <div>
        <div className="question-form">
          <FontAwesomeIcon
            className="times-icon"
            icon="times"
            size="1x"
            onClick={this.deleteQuestion}
          />
          <FormGroup>
            <Label>Question</Label>

            <Input
              type="text"
              name="title"
              placeholder="Ex: Who is Huck Finn's best friend?"
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
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.state.correctAnswerIndex === 0
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 0)}
                >
                  {this.state.correctAnswerIndex === 0
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
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.state.correctAnswerIndex === 1
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 1)}
                >
                  {this.state.correctAnswerIndex === 1
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
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.state.correctAnswerIndex === 2
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 2)}
                >
                  {this.state.correctAnswerIndex === 2
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
                />
              </Col>
              <Col lg="3" className="option-col">
                <Button
                  color={
                    this.state.correctAnswerIndex === 3
                      ? 'success'
                      : 'secondary'
                  }
                  className="correct-btn"
                  onClick={e => this.handleCorrectAnswer(e, 3)}
                >
                  {this.state.correctAnswerIndex === 3
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
