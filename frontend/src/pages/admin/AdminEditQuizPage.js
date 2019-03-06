import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminQuizForm from '../../components/admin/AdminQuizForm';
import AdminNavigator from '../../components/admin/AdminNavigator';
import AdminBookSelect from '../../components/admin/AdminBookSelect';
import AdminQuizSelect from '../../components/admin/AdminQuizSelect';
import AdminDeleteModal from '../../components/admin/AdminDeleteModal';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { editQuiz, deleteQuiz } from '../../utils/api.js';
class AdminEditQuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      errors: [],
      currentSelectedBook: -1,
      currentSelectedQuiz: -1,
      numSubmits: 0,
      deleteButtonPressed: false
    };
  }
  handleSuccess = () => {
    this.setState({ errors: [], success: true });
  };

  handleDeletePress = e => {
    e.preventDefault();
    this.setState({ deleteButtonPressed: true });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      deleteButtonPressed: !prevState.deleteButtonPressed
    }));
  };

  handleBookSelect = book => {
    this.setState({
      currentSelectedBook: book,
      currentSelectedQuiz: -1
    });
  };

  frontendValidated = formState => {
    var errors = [];
    var key = this.state.numSubmits;
    if (formState.quiz_name.length === 0) {
      errors.push({ message: 'The quiz is missing a title.', key: key++ });
    }
    if (formState.questions.length === 0) {
      errors.push({ message: 'There are no questions.', key: key++ });
    }

    for (var question in formState.questions) {
      if (formState.questions[question].correct_option.length < 1) {
        errors.push({
          message:
            'Question ' +
            (parseInt(question) + 1) +
            " doesn't have a correct answer selected.",
          key: key++
        });
      }
      for (var option in formState.questions[question].options) {
        if (formState.questions[question].options[option].length < 1) {
          errors.push({
            message:
              'Question ' +
              (parseInt(question) + 1) +
              ' option ' +
              (parseInt(option) + 1) +
              " doesn't have a value.",
            key: key++
          });
        }
      }
    }
    if (errors.length > 0) {
      this.setState(state => ({
        errors: errors,
        numSubmits: key //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
      return false;
    }
    return true;
  };

  handleQuizSelect = quiz => {
    var questions_with_idx = quiz['quizzes'].map((elem, idx) => {
      return {
        ...elem,
        correct_option_idx: elem.options.indexOf(elem['correct_option'])
      };
    });
    this.setState({
      currentSelectedQuiz: { ...quiz, quizzes: questions_with_idx }
    });
  };
  handleSubmit = async (event, formState) => {
    event.preventDefault();
    console.log(formState);
    if (this.frontendValidated(formState)) {
      const { message, success } = await editQuiz({
        name: formState.quiz_name,
        published: formState.published,
        book_id: this.state.currentSelectedBook.id,
        questions: formState.questions,
        quiz_id: formState.questions[0].quiz_id
      });
      if (success) {
        this.handleSuccess();
      } else {
        this.setState(state => ({
          errors: [{ message: message, key: state.numSubmits }],
          numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
        }));
      }
    }
  };

  deleteQuiz = async e => {
    e.preventDefault();
    console.log(this.state.currentSelectedQuiz);
    const { message, success } = await deleteQuiz({
      quiz_id: this.state.currentSelectedQuiz['quizzes'][0]['quiz_id']
    });
    if (success) {
      this.handleSuccess();
      this.setState(state => ({
        deleteButtonPressed: false
      }));
    } else {
      this.setState(state => ({
        deleteButtonPressed: false,
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
    }
  };
  render() {
    return (
      <Container fluid>
        <AdminDeleteModal
          handleYesDelete={this.deleteQuiz}
          isOpen={this.state.deleteButtonPressed}
          book={this.state.currentSelectedQuiz}
          toggleModal={this.toggleModal}
        />
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="9" className="admin-home">
            <h1>Edit Quiz</h1>
            <hr />
            {this.state.errors.map(({ message, key }) => {
              return (
                <Alert key={key} color="danger">
                  {message}
                </Alert>
              );
            })}
            {!this.state.success && (
              <AdminBookSelect handleBookSelect={this.handleBookSelect} />
            )}
            {!this.state.success &&
              (this.state.currentSelectedBook.id !== undefined && (
                <AdminQuizSelect
                  quiz_id={this.state.currentSelectedBook.id}
                  handleQuizSelect={this.handleQuizSelect}
                />
              ))}
            {this.state.success && (
              <Alert color="success">
                Quiz was successfully edited. Would you like to{' '}
                <a href="/admin/quiz/edit"> edit another? </a>
              </Alert>
            )}
            {!this.state.success &&
              (this.state.currentSelectedQuiz !== -1 &&
                (this.state.currentSelectedBook.id > -1 && (
                  <AdminQuizForm
                    type="Edit"
                    handleSubmit={this.handleSubmit}
                    handleDeletePress={this.handleDeletePress}
                    quiz={this.state.currentSelectedQuiz}
                  />
                )))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminEditQuizPage;
