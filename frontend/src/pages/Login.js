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
    const { success, result } = await login(new FormData(form));
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
      return <FormAlert>You are logged in!</FormAlert>;
    } else {
      return <FormAlert isRed={true}>You are not logged in!</FormAlert>;
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
          <Form className="form-signin">
            <Card className="login-card">
              <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
              <FormGroup>
                <Label className="sr-only" for="email">
                  Email
                </Label>
                <Input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
              </FormGroup>
              <FormGroup>
                {/* <Label for="password">Password</Label> */}
                <Input name="password" type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Button
                  className="btn btn-lg btn-primary btn-block"
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
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
