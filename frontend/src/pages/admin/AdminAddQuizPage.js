import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import AdminQuizForm from '../../components/AdminQuizForm';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
class AdminAddQuizPage extends Component {
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
            <h1>Add Quiz</h1>
            <hr />
            {this.state.success ? (
              <Alert color="success">
                Quiz was successfully created. Would you like to{' '}
                <a href="/admin/quiz/add"> create another? </a>
              </Alert>
            ) : (
              <AdminQuizForm type="Add" handleSuccess={this.handleSuccess} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminAddQuizPage;
