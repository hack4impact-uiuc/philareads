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
      title: '',
      errors: [],
      numSubmits: 0,
      questions: []
    };
  }

  updateStateForProps = () => {
    if (
      this.props.currentBook != null &&
      this.state.id !== this.props.currentBook.id
    ) {
      this.setState(
        {
          title: this.props.currentBook.name,
          author: this.props.currentBook.author,
          cover_url: this.props.currentBook.cover_url,
          reader_url: this.props.currentBook.reader_url,
          year: this.props.currentBook.year,
          grade: this.props.currentBook.grade,
          id: this.props.currentBook.id
        },
        () => {
          this.testImage();
          // Can't reuse the testBookURL method since it relies on an event
          var patt = new RegExp(
            /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/
          );
          this.setState({ bookURLValid: patt.test(this.state.reader_url) });
        }
      );
    }
  };
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

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (true) {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { message, success } = await createQuiz({
      name: this.state.title,
      author: this.state.author,
      grade: parseInt(this.state.grade),
      year: parseInt(this.state.year),
      cover_url: this.state.cover_url,
      reader_url: this.state.reader_url
    });
    if (success) {
      this.props.handleSuccess();
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
    }
  };

  addQuestion = () => {
    this.setState(state => ({
      questions: [...state.questions, {}]
    }));
  };
  render() {
    return (
      <Form className="quiz-form">
        {this.state.errors.map(({ message, key }) => {
          return (
            <Alert key={key} color="danger">
              {message}
            </Alert>
          );
        })}
        <FormGroup>
          <Label>Quiz Title</Label>
          <Input
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="Ex: The Adventures of Huckleberry Finn"
            value={this.state.title}
          />
        </FormGroup>
        {this.state.questions.map((element, index) => {
          return <AdminQuestion />;
        })}
        <Button block onClick={this.addQuestion}>
          Add Question
        </Button>

        <FormGroup>
          <Button
            onClick={this.handleSubmit}
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
