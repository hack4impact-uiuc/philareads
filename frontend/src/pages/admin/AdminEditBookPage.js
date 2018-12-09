import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminBookForm from '../../components/AdminBookForm';
import AdminDeleteModal from '../../components/AdminDeleteModal';
import AdminNavigator from '../../components/AdminNavigator';
import AdminBookSelect from '../../components/AdminBookSelect';
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
      deleteButtonPressed: false
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
    const { message, success } = await deleteBook();
    if (success) {
      this.setState({ success: true });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }]
      }));
      //TODO: display errors if fetch doesn't work
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
            <AdminBookSelect handleBookSelect={this.handleBookSelect} />
            {this.state.success && (
              <Alert color="success">
                Book was successfully modified. Would you like to{' '}
                <a href="/admin/book/edit"> edit another? </a>
              </Alert>
            )}
            {!this.state.success && this.getDropdown()}
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
