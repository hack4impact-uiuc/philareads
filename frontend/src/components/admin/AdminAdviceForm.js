import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  Col,
  Row,
  FormFeedback
} from 'reactstrap';
import '../../styles/admin/AdminAdviceForm.scss';
import { createAdvice, editAdvice } from '../../utils/api.js';

class AdminAdviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.advice ? props.advice.text : '',
      id: props.advice ? props.advice.id : null,
      errors: [],
      numSubmits: 0
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (this.state.text !== '') {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const apiCall = this.props.type === 'Edit' ? editAdvice : createAdvice;
    const additionalAdviceData =
      this.props.type === 'Edit' ? { id: this.state.id } : {};
    const { message, success } = await apiCall({
      text: this.state.text,
      ...additionalAdviceData
    });
    if (success) {
      this.setState({ errors: [] });
      this.props.handleSuccess();
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
    }
  };

  render() {
    return (
      <Form className="advice-form">
        {this.state.errors.map(({ message, key }) => {
          return (
            <Alert key={key} color="danger">
              {message}
            </Alert>
          );
        })}
        <FormGroup>
          <Label>Advice</Label>
          <Input
            type="textarea"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
        </FormGroup>
        <FormGroup>
          <Button
            onClick={this.handleSubmit}
            disabled={!this.canSubmitWithoutError()}
            color={this.props.type === 'Edit' ? 'warning' : 'primary'}
          >
            {`${this.props.type} Parent Advice`}
          </Button>
          {this.props.type === 'Edit' && (
            <Button onClick={this.props.handleDeletePress} color="danger">
              Delete
            </Button>
          )}
        </FormGroup>
      </Form>
    );
  }
}

export default AdminAdviceForm;
