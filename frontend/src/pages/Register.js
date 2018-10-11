import logo from '../logo.svg';
import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  FormText
} from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="row">
          <div className="col-lg-6">
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Input without validation</Label>
                <Input />
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
