import logo from '../logo.svg';
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
import { register } from '../utils/api.js';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    var form = document.querySelector('form');
    var s = await register(new FormData(form));
    console.log(s);
  }

  render() {
    return (
      <div className="container">
        <h1>Sign Up!</h1>
        <div className="row">
          <div className="col-lg-6">
            <Form name="form">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input name="name" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input name="email" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
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
