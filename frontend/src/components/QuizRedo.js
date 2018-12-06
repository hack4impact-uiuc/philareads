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
  renderModal = () => {
    return (
      <div>
        <Modal isOpen={this.props.showEndModal} toggle={this.props.closeModal}>
          <ModalHeader toggle={this.props.closeModal}>
            You've completed the quiz!
          </ModalHeader>
          <ModalBody>
            You've completed the quiz with a total score of:{' '}
            {this.props.numCorrectQ}/{this.props.numTotalQ}.<br />
            You can redo this quiz, or move on to other activities!
          </ModalBody>
          <div
            style={{
              marginLeft: '50px',
              marginRight: '50px',
              marginBottom: '20px'
            }}
          >
            <Progress multi>
              <Progress bar value="15" />
              <Progress bar color="success" value="30" />
              <Progress bar color="info" value="25" />
              <Progress bar color="warning" value="20" />
              <Progress bar color="danger" value="5" />
            </Progress>
          </div>
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
