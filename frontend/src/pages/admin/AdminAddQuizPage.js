import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminQuizForm from '../../components/AdminQuizForm';
import AdminNavigator from '../../components/AdminNavigator';
import AdminBookSelect from '../../components/AdminBookSelect';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { createQuiz } from '../../utils/api';
class AdminAddQuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      errors: [],
      currentSelectedBook: -1,
      numSubmits: 0
    };
  }
  handleSuccess = () => {
    this.setState({ errors: [], success: true });
  };

  handleBookSelect = book => {
    this.setState({
      currentSelectedBook: book
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

  handleSubmit = async (event, formState) => {
    event.preventDefault();
    if (this.frontendValidated(formState)) {
      const { message, success } = await createQuiz({
        name: formState.quiz_name,
        published: formState.published,
        book_id: this.state.currentSelectedBook.id,
        questions: formState.questions
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="9" className="admin-home">
            <h1>Add Quiz</h1>
            <hr />
            {this.state.errors.map(({ message, key }) => {
              return (
                <Alert key={key} color="danger">
                  {message}
                </Alert>
              );
            })}
            <AdminBookSelect handleBookSelect={this.handleBookSelect} />
            {this.state.success ? (
              <Alert color="success">
                Quiz was successfully created. Would you like to{' '}
                <a href="/admin/quiz/add"> create another? </a>
              </Alert>
            ) : (
              this.state.currentSelectedBook.id > -1 && (
                <AdminQuizForm type="Add" handleSubmit={this.handleSubmit} />
              )
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddQuizPage;
