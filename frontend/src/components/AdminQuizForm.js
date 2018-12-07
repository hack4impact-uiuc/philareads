import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  Col,
  Row,
  FormFeedback
} from 'reactstrap';
import AdminQuestion from '../components/AdminQuestion';
import '../styles/admin/AdminQuizForm.scss';
import { createQuiz } from '../utils/api.js';

class AdminQuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz_name: '',
      errors: [],
      numSubmits: 0,
      questions: [],
      published: false,
      questionCounter: 0
    };
  }

  updateStateForProps = () => {};

  componentDidUpdate(previousProps) {
    this.updateStateForProps();
  }

  componentDidMount() {
    this.updateStateForProps();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  togglePublish = e => {
    this.setState({
      published: e.target.checked
    });
  };
  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (true) {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  handleQuestionDelete = index => {
    this.setState(state => {
      var q = [...state.questions];
      q.splice(index, 1);
      return {
        questions: q
      };
    });
  };

  addQuestion = () => {
    this.setState(state => ({
      questions: [
        ...state.questions,
        {
          questionKey: state.questionCounter,
          text: '',
          options: ['', '', '', ''],
          correct_option: '',
          correct_option_idx: -1
        }
      ],
      questionCounter: state.questionCounter + 1
    }));
  };

  handleElementChange = (question, idx) => {
    this.setState(state => {
      var questionsCopy = JSON.parse(JSON.stringify(state.questions));
      questionsCopy[idx] = question;
      return {
        questions: questionsCopy
      };
    });
  };
  render() {
    return (
      <Form className="quiz-form">
        <FormGroup>
          <Label>Quiz Title</Label>
          <Input
            type="text"
            name="quiz_name"
            onChange={this.handleChange}
            placeholder="Ex: The Adventures of Huckleberry Finn"
            value={this.state.quiz_name}
          />
        </FormGroup>

        <FormGroup>
          <Label>Published?</Label>
          <Input
            className="published-checkbox"
            type="checkbox"
            name="published"
            onChange={this.togglePublish}
            placeholder="Ex: The Adventures of Huckleberry Finn"
            value={this.state.title}
          />
        </FormGroup>

        {/* questionKey and index are separate here - index is being used as index in array while questionKey is a unique counter value */}
        {this.state.questions.map((element, index) => {
          return (
            <AdminQuestion
              key={element.questionKey}
              indexInQuestionArray={index}
              question={element}
              changeHandler={this.handleElementChange}
              questionDeleteHandler={this.handleQuestionDelete}
            />
          );
        })}
        <Button block onClick={this.addQuestion}>
          Add Question
        </Button>

        <FormGroup>
          <Button
            onClick={e => this.props.handleSubmit(e, this.state)}
            disabled={!this.canSubmitWithoutError()}
            color={this.props.type === 'Edit' ? 'warning' : 'primary'}
          >
            {this.props.type} Quiz
          </Button>
          {this.props.type === 'Edit' && (
            <Button
              disabled={!this.props.currentBook}
              onClick={this.props.handleDeletePress}
              color="danger"
            >
              Delete{' '}
              {this.props.currentBook &&
                '"' + this.props.currentBook.name + '"'}
            </Button>
          )}
        </FormGroup>
      </Form>
    );
  }
}

export default AdminQuizForm;
