import logo from '../logo.svg';
import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  Card,
  FormFeedback,
  FormText
} from 'reactstrap';
import { Redirect } from 'react-router';
import { register } from '../utils/api.js';
import Cookies from 'universal-cookie';
import '../styles/Login.scss';

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

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    var form = document.querySelector('form');
    const { success, result } = await register({
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    });
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
        <div className="text-center">
          <Form className="form-signin" name="form">
            <Card className="login-card">
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <FormGroup>
                <Input
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Full name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  className={
                    'form-control ' +
                    (this.validateEmail() ? 'is-valid' : 'is-invalid')
                  }
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Password"
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
            </Card>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
