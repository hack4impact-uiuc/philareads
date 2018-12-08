import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class AdminYearModal extends Component {
  render() {
    return (
      <div>
        <Modal
          toggle={this.props.toggleModal}
          isOpen={this.props.isOpen}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
          <ModalBody>
            Change the active Reading Olympics year to{' '}
            <i>{this.props.objectName}</i>?
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

export default AdminYearModal;
