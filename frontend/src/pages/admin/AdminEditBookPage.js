import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminBookForm from '../../components/AdminBookForm';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { getAllBooks } from '../../utils/api';

class AdminEditBookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      books: [],
      currentSelectedBook: null
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
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col md="6" className="admin-edit">
            <h1>Edit Book</h1>
            <hr />
            {this.getDropdown()}
            {this.state.success ? (
              <Alert color="success">
                Book was successfully created. Would you like to{' '}
                <a href="/admin/book/add"> create another? </a>
              </Alert>
            ) : (
              <AdminBookForm
                currentBook={this.state.currentSelectedBook}
                handleSuccess={this.handleSuccess}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminEditBookPage;
