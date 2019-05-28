import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminBookForm from '../../components/admin/AdminBookForm';
import AdminDeleteModal from '../../components/admin/AdminDeleteModal';
import AdminNavigator from '../../components/admin/AdminNavigator';
import AdminBookSelect from '../../components/admin/AdminBookSelect';
import { Link } from 'react-router-dom';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { deleteBook } from '../../utils/api';
class AdminEditBookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      books: [],
      currentSelectedBook: null,
      deleteButtonPressed: false,
      errors: [],
      numSubmits: 0
    };
  }
  handleSuccess = () => {
    this.setState({ success: true });
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
    const { message, success } = await deleteBook({
      book_id: this.state.currentSelectedBook.id
    });
    if (success) {
      this.setState({ success: true, errors: [] });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1
      }));
    }
  };

  handleBookSelect = book => {
    this.setState({
      currentSelectedBook: book
    });
  };

  render() {
    return (
      <Container fluid>
        <AdminDeleteModal
          handleYesDelete={this.deleteBook}
          isOpen={this.state.deleteButtonPressed}
          book={this.state.currentSelectedBook}
          toggleModal={this.toggleModal}
        />
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-edit">
            <h1>Edit Book</h1>
            <hr />
            {this.state.errors.map(({ message, key }) => {
              return (
                <Alert key={key} color="danger">
                  {message}
                </Alert>
              );
            })}
            {this.state.success && (
              <Alert color="success">
                Book was successfully modified. Would you like to{' '}
                <Link to="/admin/book/edit">edit another</Link>?
              </Alert>
            )}
            {!this.state.success && (
              <AdminBookSelect handleBookSelect={this.handleBookSelect} />
            )}
            {!this.state.success &&
              (this.state.currentSelectedBook !== null && (
                <AdminBookForm
                  type="Edit"
                  currentBook={this.state.currentSelectedBook}
                  handleSuccess={this.handleSuccess}
                  handleDeletePress={this.handleDeletePress}
                />
              ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminEditBookPage;
