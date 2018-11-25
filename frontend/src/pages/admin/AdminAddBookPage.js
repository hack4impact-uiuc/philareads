import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminBookForm from '../../components/AdminBookForm';
import AdminNavigator from '../../components/AdminNavigator';
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
                <a href="/admin/book/add"> create another? </a>
              </Alert>
            ) : (
              <AdminBookForm handleSuccess={this.handleSuccess} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddBookPage;
