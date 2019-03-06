import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class AdminPublishModal extends Component {
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
            Are you sure you want to publish <i>{this.props.objectName}</i>?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.handleConfirm}>
              Publish
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

export default AdminPublishModal;
