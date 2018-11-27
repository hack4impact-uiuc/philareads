import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
class AdminPage extends Component {
  onDrop(files) {
    this.setState({
      files
    });
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="10" className="admin-home">
            <h1>Admin Home</h1>
            Features:
            <ul>
              <li>Define which books are in which year's Reading Olympics</li>
              <li>Define a book</li>
              <li>Upload a new quiz for a book</li>
              <li>Change parent advice information</li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminPage;
