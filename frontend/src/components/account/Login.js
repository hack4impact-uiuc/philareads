import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Alert, Button, Card } from 'reactstrap';
import { login } from '../../utils/api.js';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import '../../styles/Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      username: '',
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
      username: this.state.username
    });
    if (success) {
      const cookies = new Cookies();
      cookies.set('jwt', result['auth_token'], { path: '/' });
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
    if (this.state.username.length > 0 && this.state.password.length > 0) {
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
        {this.state.isLoggedIn && (
          <Redirect to={{ pathname: '/', state: { referrer: 'login' } }} />
        )}
        {this.getLoggedInMessage()}

        <div className="text-center">
          <Form className="form-signin">
            <Card className="login-card">
              <FormGroup>
                <Label className="sr-only" for="username">
                  Username
                </Label>
                <Input
                  onChange={this.handleChange}
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
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
