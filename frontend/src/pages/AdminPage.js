import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Container, Row, Col } from 'reactstrap';
import AdminNavigator from '../components/AdminNavigator';

class AdminPage extends Component {
  onDrop(files) {
    this.setState({
      files
    });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md="2">
            <AdminNavigator />
          </Col>
          <Col md="10">
            <h1>Admin Page</h1>
            Features:
            <ul>
              <li>Define which books are in which year's Reading Olympics</li>
              <li>Define a book</li>
              <li>Upload a new quiz for a book</li>
              <li>Change parent advice information</li>
            </ul>
            <Dropzone onDrop={this.onDrop.bind(this)} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminPage;
