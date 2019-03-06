import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
  Card,
  FormFeedback
} from 'reactstrap';
import { Redirect } from 'react-router';
import { register } from '../../utils/api.js';
import Cookies from 'universal-cookie';
import '../../styles/Login.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      password_confirm: '',
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

  canSubmit() {
    var canSubmit = false;
    if (
      this.state.username.length > 0 &&
      this.state.name.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password_confirm.length > 0 &&
      this.state.password === this.state.password_confirm
    ) {
      canSubmit = true;
    }
    return canSubmit;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { success, result, message } = await register({
      name: this.state.name,
      password: this.state.password,
      username: this.state.username
    });
    if (success) {
      const cookies = new Cookies();
      cookies.set('jwt', result['auth_token'], { path: '/' });
      this.setState({ errors: [], isLoggedIn: this.isLoggedIn() });
    } else {
      // We can possibly remove this in future if we realize we're only needing to set
      // at most one alert. This is currently in here to allow us to add/display multiple alerts
      // but clear them out after POST requests.
      this.setState({ errors: [] });
      this.handleAPIErrors(message);
    }
  };

  handleAPIErrors(message) {
    this.setState(state => ({
      errors: [...state.errors, { message: message, key: state.errors.length }]
    }));
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
        {/* Redirect to the kids page if JWT exists*/}
        {this.state.isLoggedIn && (
          <Redirect to={{ pathname: '/', state: { referrer: 'register' } }} />
        )}
        {this.getLoggedInMessage()}
        <div className="text-center">
          <Form className="form-signin" name="form">
            <Card className="login-card">
              <FormGroup>
                <Input
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Full name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={this.handleChange}
                  ref="usernameInput"
                  onBlur={() => this.forceUpdate()}
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Confirm Password"
                  name="password_confirm"
                  type="password"
                  ref="passwordConfirm"
                  autoComplete="new-password"
                  onBlur={() => this.forceUpdate()}
                  onChange={this.handleChange}
                  className={
                    'form-control ' +
                    (this.state.password_confirm.length > 0 &&
                      (this.state.password_confirm === this.state.password
                        ? 'is-valid'
                        : 'is-invalid'))
                  }
                />

                {/* Find if the element is not in focus, and if so, render an error if invalid */}
                {document.activeElement !==
                  ReactDOM.findDOMNode(this.refs.passwordConfirm) && (
                  <FormFeedback invalid="true">
                    Looks like your password doesn't match.
                  </FormFeedback>
                )}
                <FormFeedback valid>Great! Your password matches.</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button
                  disabled={!this.canSubmit()}
                  className="btn btn-lg btn-primary btn-block"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  Register
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
