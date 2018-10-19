import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Button,
  FormFeedback,
  FormText
} from 'reactstrap';
import { login } from '../utils/api.js';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import FormAlert from '../components/FormAlert';
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
                <Button
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}
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
