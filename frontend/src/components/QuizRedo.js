import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress
} from 'reactstrap';

class QuizRedo extends Component {
  renderProgress = () => {
    let correct = (this.props.numCorrectQ / this.props.numTotalQ) * 100;
    let incorrect =
      ((this.props.numTotalQ - this.props.numCorrectQ) / this.props.numTotalQ) *
      100;
    return (
      <div
        style={{
          marginLeft: '50px',
          marginRight: '50px',
          marginBottom: '20px'
        }}
      >
        <Progress multi>
          <Progress bar color="success" value={correct} />
          <Progress bar color="danger" value={incorrect} />
        </Progress>
      </div>
    );
  };

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
            {this.renderProgress()}
            You can redo this quiz, or move on to other activities!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.redoQuiz}>
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
