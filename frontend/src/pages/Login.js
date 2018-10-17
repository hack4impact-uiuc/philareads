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
import { login } from '../utils/api.js';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    var form = document.querySelector('form');
    login(new FormData(form));
  };

  render() {
    return (
      <div className="container">
        <h1>Login!</h1>
        <div className="row">
          <div className="col-lg-6">
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input name="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <Button color="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
