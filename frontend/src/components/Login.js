import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Alert, Button, Card } from 'reactstrap';
import { login } from '../utils/api.js';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import '../styles/Login.scss';
import validateEmail from '../utils/validationHelpers';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      isLoggedIn: this.isLoggedIn(),
      errors: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ errors: [] });

    const { message, success, result } = await login({
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    });
    if (success) {
      const cookies = new Cookies();
      cookies.set('jwt', result['auth_token']);
      this.setState({ isLoggedIn: this.isLoggedIn() });
    } else {
      // TODO: Display message if login wasn't successful
      this.handleAPIErrors(message);
    }
  };

  handleAPIErrors(message) {
    this.setState(state => ({
      errors: [...state.errors, { message: message, key: state.errors.length }]
    }));
  }

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (validateEmail(this.state.email) && this.state.password.length > 0) {
      // TODO: Add more validation
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  isLoggedIn() {
    const cookies = new Cookies();
    return cookies.get('jwt') !== undefined;
  }

  getLoggedInMessage() {
    return this.state.errors.map(({ message, key }) => {
      return (
        <Alert key={key} color="danger">
          {message}
        </Alert>
      );
    });
  }

  render() {
    return (
      <div className="container">
        {/* Redirect to home if JWT exists*/}
        {this.state.isLoggedIn && <Redirect to="/" />}
        {this.getLoggedInMessage()}

        <div className="text-center">
          <Form className="form-signin">
            <Card className="login-card">
              <FormGroup>
                <Label className="sr-only" for="email">
                  Email
                </Label>
                <Input
                  onChange={this.handleChange}
                  className={
                    'form-control ' +
                    (this.state.email.length > 0 &&
                      (validateEmail(this.state.email)
                        ? 'is-valid'
                        : 'is-invalid'))
                  }
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </FormGroup>
              <FormGroup>
                <Button
                  disabled={!this.canSubmitWithoutError()}
                  className="btn btn-lg btn-primary btn-block"
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </FormGroup>
            </Card>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
