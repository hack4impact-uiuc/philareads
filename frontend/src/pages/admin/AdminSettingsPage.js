import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AdminNavigator from '../../components/AdminNavigator';
import AdminYearSection from '../../components/admin/AdminYearSection';
import '../../styles/admin/AdminHome.scss';

class AdminSettingsPage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-home">
            <AdminYearSection />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminSettingsPage;
