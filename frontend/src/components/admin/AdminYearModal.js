import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class AdminYearModal extends Component {
  render() {
    return (
      <Modal
        toggle={this.props.toggleModal}
        isOpen={this.props.isOpen}
        className={this.props.className}
      >
        <ModalHeader>Confirm</ModalHeader>
        <ModalBody>
          Change the active Reading Olympics year to{' '}
          <b>{this.props.objectName}</b>?<br />
          <br />
          Note: This will also publish all books in the database that are for
          Reading Olympics <b>{this.props.objectName}</b>, even if they
          currently are not published.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.handleConfirm}>
            Yes
          </Button>
          <Button color="primary" onClick={this.props.toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AdminYearModal;
