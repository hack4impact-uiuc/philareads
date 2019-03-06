import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminAdviceForm from '../../components/admin/AdminAdviceForm';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';

class AdminAddAdvicePage extends Component {
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
            <h1>Add Parent Advice</h1>
            <hr />
            {this.state.success ? (
              <Alert color="success">
                Advice successfully created. Would you like to{' '}
                <a href="/admin/advice/add">create another</a>?
              </Alert>
            ) : (
              <AdminAdviceForm type="Add" handleSuccess={this.handleSuccess} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddAdvicePage;
