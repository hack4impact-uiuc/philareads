import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Button,
  Card,
  FormFeedback,
  FormText
} from 'reactstrap';
import { login } from '../utils/api.js';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import FormAlert from '../components/FormAlert';
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
      cookies.set('jwt', result['token']);
      this.setState({ isLoggedIn: this.isLoggedIn() });
    } else {
      // TODO: Display message if login wasn't successful
      this.handleAPIErrors(message);
    }
  };

  handleAPIErrors(message) {
    console.log(message);
    this.setState({
      errors: [
        ...this.state.errors,
        { message: message, key: this.state.errors.length }
      ]
    });
  }

  canSubmit() {
    var canSubmit = false;
    if (validateEmail(this.state.email)) {
      // TODO: Add more validation
      canSubmit = true;
    }
    return canSubmit;
  }

  isLoggedIn() {
    const cookies = new Cookies();
    return cookies.get('jwt') !== undefined;
  }

  getLoggedInMessage() {
    return this.state.errors.map(({ message, key }) => {
      return <FormAlert key={key}>{message}</FormAlert>;
    });
  }

  render() {
    const message = this.getLoggedInMessage();
    return (
      <div className="container">
        {/* Redirect to the kids page if JWT exists*/}
        {this.state.isLoggedIn && <Redirect to="/kids" />}
        {message}

        <div className="text-center">
          <Form className="form-signin">
            <Card className="login-card">
              <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
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
                  placeholder="Email address"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Button
                  disabled={!this.canSubmit()}
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