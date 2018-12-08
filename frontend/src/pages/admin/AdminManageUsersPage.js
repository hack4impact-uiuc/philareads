import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap';
import AdminNavigator from '../../components/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { upgradeUser } from '../../utils/api';

class AdminManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      alert: null
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  setStateAlert = message => {
    this.setState({
      alert: message
    });
  };

  handleUpgrade = async () => {
    const query = this.state.username.trim();

    const {
      success,
      result: { results },
      message
    } = await upgradeUser({
      user_username: query
    });

    if (success) {
      this.toggleModal();
      this.setStateAlert(message);
    } else {
      this.toggleModal();
      this.setStateAlert(message);
    }
  };

  render() {
    let header;
    if (this.state.alert !== null) {
      header = <Alert color="danger">{this.state.alert}</Alert>;
    }
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="10">
            <h1>Upgrade an Account</h1>
            <hr />
            {header}
            <h5>Make an accout an admin account.</h5>
            <p>Account to Upgrade:</p>
            <Form>
              <Input
                placeholder="Username"
                onChange={event => {
                  this.setState({ username: event.target.value });
                }}
              />
              <br />
              <Button
                onClick={this.toggleModal}
                color="primary"
                className="float-right"
              >
                Upgrade
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalBody>
                  Are you sure you want to upgrade {this.state.username} to an
                  admin?
                </ModalBody>
                <span className="modal-buttons">
                  <Button
                    onClick={this.toggleModal}
                    color="danger"
                    className="float-right modal-button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.handleUpgrade}
                    color="success"
                    className="float-right modal-button"
                  >
                    Yes
                  </Button>
                </span>
              </Modal>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminManageUsersPage;
