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
import register from '../utils/api.js';

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
    register(this.state.username, this.state.password);
  };

  render() {
    return (
      <div className="container">
        <h1>Login!</h1>
        <div className="row">
          <div className="col-lg-6">
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input name="username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  onSubmit={this.handleSubmit}
                >
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
