import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Container, Row, Col } from 'reactstrap';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
class AdminCSVUploadPage extends Component {
  onDrop(files) {
    this.setState({
      files
    });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="10" className="admin-home">
            <h1>Admin CSV Upload Page</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminCSVUploadPage;
