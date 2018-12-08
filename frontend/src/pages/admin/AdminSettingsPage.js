import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  FormText,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminNavigator from '../../components/AdminNavigator';
import AdminPublishModal from '../../components/admin/AdminPublishModal';
import { getAllBooks, getBooksByYearGrade, getQuizzes } from '../../utils/api';
import '../../styles/admin/AdminHome.scss';

class AdminSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      books: [],
      currentSelectedBook: null,
      readingOlympicsYear: '',
      errors: [],
      readingOlympicsYear: ''
    };
    this.getBooks();
  }
  handleSuccess = () => {
    this.setState({ success: true });
  };

  getBooks = async () => {
    const { message, success, result } = await getAllBooks();
    if (success) {
      const sortedByName = result['results'].sort(
        (a, b) => (a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1)
      );
      this.setState({ books: sortedByName });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }]
      }));
      //TODO: display errors if fetch doesn't work
    }
  };

  changeSelection = e => {
    this.setState({
      currentSelectedBook: this.state.books[e.target.selectedIndex]
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getDropdown() {
    return (
      <select
        className="form-control"
        onChange={this.changeSelection}
        onFocus={e => (e.target.selectedIndex = -1)}
      >
        {this.state.books.map((element, id) => {
          return (
            <option key={element['id']} value={element['id']}>
              {element['name'] + ' (' + element['author'] + ')'}
            </option>
          );
        })}
      </select>
    );
  }

  renderActiveYear = () => {
    return (
      <Card>
        <CardBody>
          <CardText>
            <Form>
              <FormGroup>
                <Label>Current Reading Olympics Year</Label>
                <Input
                  type="text"
                  name="readingOlympicsYear"
                  className={
                    'form-control ' +
                    (this.state.readingOlympicsYear !== '' &&
                      (isNaN(this.state.readingOlympicsYear)
                        ? 'is-invalid'
                        : 'is-valid'))
                  }
                  onChange={this.handleChange}
                  maxLength="4"
                  pattern="[0-9]{4}"
                  required
                  placeholder="Ex: 2018"
                  value={this.state.readingOlympicsYear}
                />
                <FormText>
                  Specify the active Reading Olympics year, which determines
                  where the button on the{' '}
                  <Link to="/ReadingOlympics">Reading Olympics main page</Link>{' '}
                  goes to.
                </FormText>
                <FormFeedback invalid="true">
                  The year has to be a number.
                </FormFeedback>
              </FormGroup>
              <Button>Update</Button>
            </Form>
          </CardText>
        </CardBody>
      </Card>
    );
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

  deleteBook = async () => {
    this.toggleModal();
    // const { message, success, result } = await deleteBook();
    // if (success) {
    //   this.setState({ success: true });
    // } else {
    //   this.setState(state => ({
    //     errors: [{ message: message, key: state.numSubmits }]
    //   }));
    //TODO: display errors if fetch doesn't work
    // }
  };

  render() {
    return (
      <Container fluid>
        <AdminPublishModal
          handleYesDelete={this.deleteBook}
          isOpen={this.state.deleteButtonPressed}
          book={this.state.currentSelectedBook}
          toggleModal={this.toggleModal}
        />
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-home">
            {this.renderActiveYear()}
            {this.getDropdown()}
            <h1>View unpublished books</h1>
            <hr />
            <h1>View unpublished quizzes</h1>
            <hr />
            {this.state.success && (
              <Alert color="success">
                Book was successfully created. Would you like to{' '}
                <a href="/admin/book/add"> create another? </a>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminSettingsPage;
