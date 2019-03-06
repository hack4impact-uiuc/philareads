import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class AdminDeleteModal extends Component {
  render() {
    return (
      <div>
        <Modal
          toggle={this.props.toggleModal}
          isOpen={this.props.isOpen}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleModal}>Confirm</ModalHeader>
          <ModalBody>
            Are you sure you want to delete{' '}
            <i>{this.props.book !== null && this.props.book['name']}</i>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.handleYesDelete}>
              Yes
            </Button>{' '}
            <Button color="primary" onClick={this.props.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AdminDeleteModal;
