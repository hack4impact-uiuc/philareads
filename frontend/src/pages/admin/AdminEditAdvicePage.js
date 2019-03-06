import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import AdminAdviceForm from '../../components/admin/AdminAdviceForm';
import AdminNavigator from '../../components/AdminNavigator';
import AdminAdviceSelect from '../../components/admin/AdminAdviceSelect';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminHome.scss';
import { deleteAdvice } from '../../utils/api';

class AdminEditAdvicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      allAdvice: [],
      selectedAdvice: null,
      deleteButtonPressed: false,
      errors: [],
      numSubmits: 0
    };
  }
  handleSuccess = () => {
    this.setState({ success: true });
  };

  handleDeletePress = e => {
    e.preventDefault();
    this.setState({ deleteButtonPressed: true });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      deleteButtonPressed: !prevState.deleteButtonPressed
    }));
  };

  handleSelect = advice => {
    this.setState({
      selectedAdvice: advice
    });
  };

  deleteAdvice = async () => {
    this.toggleModal();
    const { message, success } = await deleteAdvice({
      id: this.state.selectedAdvice.id
    });
    if (success) {
      this.setState({ success: true, errors: [] });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1
      }));
    }
  };

  renderDeleteModal = () => {
    return (
      <Modal toggle={this.toggleModal} isOpen={this.state.deleteButtonPressed}>
        <ModalHeader toggle={this.toggleModal}>Confirm</ModalHeader>
        <ModalBody>Are you sure you want to delete this advice?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.deleteAdvice}>
            Yes
          </Button>{' '}
          <Button color="primary" onClick={this.toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    const selectedAdvice = { text: 'hello', id: 2 };
    return (
      <Container fluid>
        {this.renderDeleteModal()}
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-edit">
            <h1>Edit Parent Advice</h1>
            <hr />
            {this.state.errors.map(({ message, key }) => {
              return (
                <Alert key={key} color="danger">
                  {message}
                </Alert>
              );
            })}
            {this.state.success && (
              <Alert color="success">
                Advice was successfully modified. Would you like to{' '}
                <a href="/admin/advice/edit">edit another</a>?
              </Alert>
            )}
            {!this.state.success && (
              <AdminAdviceSelect handleSelect={this.handleSelect} />
            )}
            {!this.state.success &&
              (this.state.selectedAdvice !== null && (
                <AdminAdviceForm
                  type="Edit"
                  handleSuccess={this.handleSuccess}
                  advice={this.state.selectedAdvice}
                  key={this.state.selectedAdvice.id}
                />
              ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminEditAdvicePage;
