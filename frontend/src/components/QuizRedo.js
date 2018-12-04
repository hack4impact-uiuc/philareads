import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class QuizRedo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderModal = () => {
    return (
      <div>
        <Button color="danger" onClick={this.props.finishAttmept}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.props.showEndModal} toggle={this.props.closeModal}>
          <ModalHeader toggle={this.props.closeModal}>
            Quiz Complete!
          </ModalHeader>
          <ModalBody>
            You've completed the quiz! Your total score is: 2/3. You can redo
            this quiz, or move on to other activities!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  render() {
    return <div>{this.renderModal()}</div>;
  }
}

export default QuizRedo;
