import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
class AdminAddBookPage extends Component {
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
            <h1>Add Book</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddBookPage;
