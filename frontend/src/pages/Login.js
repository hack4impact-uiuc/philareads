import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
  FormText
} from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <div className="container">
        <h1>Login!</h1>
        <div className="row">
          <div className="col-lg-6">
            <Form method="POST">
              <FormGroup>
                <Label for="username">Username</Label>
                <Input name="username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
