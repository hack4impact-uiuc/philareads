import logo from '../logo.svg';
import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  FormFeedback,
  FormText
} from 'reactstrap';
import { Redirect } from 'react-router';
import { register } from '../utils/api.js';
import Cookies from 'universal-cookie';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      isLoggedIn: this.isLoggedIn()
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    var form = document.querySelector('form');
    const { success, result } = await register(new FormData(form));
    if (success) {
      const cookies = new Cookies();
      cookies.set('jwt', result['token']);
      this.setState({ isLoggedIn: this.isLoggedIn() });
    } else {
      // TODO: Display message if login wasn't successful
    }
  };

  isLoggedIn() {
    const cookies = new Cookies();
    return cookies.get('jwt') !== undefined;
  }

  getLoggedInMessage() {
    if (this.state.isLoggedIn) {
      return <Alert>You are logged in!</Alert>;
    } else {
      return <Alert>You are not logged in!</Alert>;
    }
  }
  render() {
    const message = this.getLoggedInMessage();

    return (
      <div className="container">
        {/* Redirect to the kids page if JWT exists*/}
        {this.state.isLoggedIn && <Redirect to="/kids" />}
        {message}
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
