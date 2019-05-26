import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminBookForm from '../../components/admin/AdminBookForm';
import AdminNavigator from '../../components/admin/AdminNavigator';
import { Link } from 'react-router-dom';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
class AdminAddBookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null
    };
  }
  handleSuccess = () => {
    this.setState({ success: true });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-home">
            <h1>Add Book</h1>
            <hr />
            {this.state.success ? (
              <Alert color="success">
                Book was successfully created. Would you like to{' '}
                <Link to="/admin/book/add">create another</Link>?
              </Alert>
            ) : (
              <AdminBookForm type="Add" handleSuccess={this.handleSuccess} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddBookPage;
