import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class QuizRedo extends Component {
  renderModal = () => {
    return (
      <div>
        <Modal isOpen={this.props.showEndModal} toggle={this.props.closeModal}>
          <ModalHeader toggle={this.props.closeModal}>
            You've completed the quiz!
          </ModalHeader>
          <ModalBody>
            You've completed the quiz with a total score of:
            <h3 style={{ textAlign: 'center' }}>
              {this.props.numCorrectQ}/{this.props.numTotalQ}
            </h3>
            You can redo this quiz, or move on to other activities!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.redoQuiz}>
              Redo
            </Button>
            <Button color="secondary" onClick={this.props.closeModal}>
              Close
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
