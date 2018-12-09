import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import AdminQuestion from '../components/AdminQuestion';
import '../styles/admin/AdminQuizForm.scss';

class AdminQuizForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    if (props.quiz === undefined || props.quiz.name === undefined) {
      console.log('empty state');
      this.state = {
        quiz_name: '',
        errors: [],
        numSubmits: 0,
        questions: [],
        orig_published: false,
        published: false,
        questionCounter: 0
      };
    } else {
      this.state = {
        quiz_name: this.props.quiz.name,
        errors: [],
        numSubmits: 0,
        questions: this.props.quiz.quizzes,
        published:
          this.props.quiz.published !== undefined
            ? this.props.quiz.published
            : true,
        orig_published:
          this.props.quiz.published !== undefined
            ? this.props.quiz.published
            : true,
        questionCounter: 0
      };
    }
  }

  componentDidUpdate(previousProps) {
    console.log('Component did update' + this.props.quiz);
    if (
      previousProps.quiz !== undefined &&
      (previousProps.quiz.book_id !== this.props.quiz.book_id ||
        previousProps.quiz.name !== this.props.quiz.name)
    ) {
      this.setState({
        questions: this.props.quiz.quizzes,
        quiz_name: this.props.quiz.name,
        published:
          this.props.quiz.published !== undefined
            ? this.props.quiz.published
            : true,
        orig_published:
          this.props.quiz.published !== undefined
            ? this.props.quiz.published
            : true
      });
    }
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

  // Get the text on the "publish" button
  getButtonText() {
    if (this.props.type === 'Add' && this.state.published) {
      return this.props.type + ' and Publish Quiz';
    }
    if (this.state.published && !this.state.orig_published) {
      return this.props.type + ' and Publish Quiz';
    }
    if (!this.state.published && this.state.orig_published) {
      return this.props.type + ' and Unpublish Quiz';
    }
    return this.props.type + ' Quiz';
  }
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
            checked={this.state.published}
          />
        </FormGroup>

        {/* questionKey and index are separate here - index is being used as index in array while questionKey is a unique counter value */}
        {this.state.questions.map((element, index) => {
          return (
            <AdminQuestion
              key={index}
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
            {this.getButtonText()}
          </Button>
          {this.props.type === 'Edit' && (
            <Button onClick={this.props.handleDeletePress} color="danger">
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
