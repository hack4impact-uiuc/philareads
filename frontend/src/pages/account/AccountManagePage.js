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
import '../../styles/Login.scss';
import { getUserData, postUserData, updatePassword } from '../../utils/api';

class AccountManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      changedName: '',
      changedUsername: '',
      profileSuccess: false,
      alertMessage: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.currentPasswordInput = React.createRef();
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const { result } = await getUserData();
    this.setState({ name: result['name'], username: result['username'] });
  };

  canSubmitProfile() {
    var canSubmit = false;
    if (
      (this.state.changedName.length > 0 &&
        this.state.changedName !== this.state.name) ||
      (this.state.changedUsername.length > 0 &&
        this.state.changedUsername !== this.state.username)
    ) {
      canSubmit = true;
    }
    return canSubmit;
  }

  canSubmitPassword() {
    var canSubmit = false;
    if (
      this.state.currentPassword.length > 0 &&
      this.state.newPassword.length > 0 &&
      this.state.newPassword === this.state.confirmPassword
    ) {
      canSubmit = true;
    }
    return canSubmit;
  }

  handleProfileSubmit = async () => {
    let userData = {
      name: this.state.name,
      username: this.state.username
    };

    if (
      this.state.changedUsername.length > 0 &&
      this.state.changedName.length > 0
    ) {
      userData = {
        name: this.state.changedName,
        username: this.state.changedUsername
      };
    } else if (this.state.changedUsername.length > 0) {
      userData = {
        name: this.state.name,
        username: this.state.changedUsername
      };
    } else if (this.state.changedName.length > 0) {
      userData = {
        name: this.state.changedName,
        username: this.state.username
      };
    }

    const { message } = await postUserData(userData);
    this.setState({ message: message });

    if (message === 'Successfully updated user') {
      this.setState({ alertMessage: 'Profile Updated!' });
    } else {
      this.setState({ alertMessage: 'Error updating profile' });
    }
  };

  handlePasswordSubmit = async () => {
    let passwordData = {
      old_password: this.state.currentPassword,
      new_password: this.state.newPassword
    };

    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const { message } = await updatePassword(passwordData);
    this.setState({ message: message });

    if (message === 'Successfully changed the password') {
      this.setState({
        alertMessage: 'Password succesfully updated!'
      });
    } else {
      this.setState({
        alertMessage: 'Invalid Password'
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <Form className="form-signin" name="form">
            {(this.state.alertMessage === 'Password succesfully updated!' ||
              this.state.alertMessage === 'Profile Updated!') && (
              <Alert color="success">
                <h5 className="text-center">{this.state.alertMessage}</h5>
              </Alert>
            )}

            {(this.state.alertMessage === 'Invalid Password' ||
              this.state.alertMessage === 'Error updating profile') && (
              <Alert color="danger">
                <h5 className="text-center">{this.state.alertMessage}</h5>
              </Alert>
            )}

            <Card className="login-card">
              <h5 className="text-left"> Name </h5>
              <FormGroup>
                <Input
                  className="form-control input-lg"
                  defaultValue={this.state.name}
                  name="name"
                  type="text"
                  onChange={txt =>
                    this.setState({ changedName: txt.target.value })
                  }
                />
              </FormGroup>
              <h5 className="text-left"> Username </h5>
              <FormGroup>
                <Input
                  className="form-control input-lg"
                  defaultValue={this.state.username}
                  name="username"
                  type="text"
                  onChange={txt =>
                    this.setState({ changedUsername: txt.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Button
                  disabled={!this.canSubmitProfile()}
                  className="btn btn-lg btn-primary btn-block"
                  color="primary"
                  onClick={() => {
                    this.handleProfileSubmit();
                  }}
                >
                  Update Profile
                </Button>
              </FormGroup>
            </Card>
          </Form>
        </div>

        <div className="text-center">
          <Form className="form-signin" name="form">
            <Card className="login-card">
              <h5 className="text-left"> Current Password </h5>
              <FormGroup>
                <Input
                  name="currentPassword"
                  type="password"
                  ref={this.currentPasswordInput}
                  onChange={txt =>
                    this.setState({ currentPassword: txt.target.value })
                  }
                  value={this.state.currentPassword}
                  className={'form-control '}
                />
              </FormGroup>
              <h5 className="text-left"> New Password </h5>
              <FormGroup>
                <Input
                  name="password"
                  type="password"
                  onChange={txt =>
                    this.setState({ newPassword: txt.target.value })
                  }
                  value={this.state.newPassword}
                />
              </FormGroup>
              <h5 className="text-left"> Confirm Password </h5>
              <FormGroup>
                <Input
                  name="passwordConfirm"
                  type="password"
                  ref="passwordConfirm"
                  onBlur={() => this.forceUpdate()}
                  onChange={txt =>
                    this.setState({ confirmPassword: txt.target.value })
                  }
                  className={
                    'form-control ' +
                    (this.state.confirmPassword.length > 0 &&
                      (this.state.confirmPassword === this.state.newPassword
                        ? 'is-valid'
                        : 'is-invalid'))
                  }
                  value={this.state.confirmPassword}
                />

                {/* Find if the element is not in focus, and if so, render an error if invalid */}
                {document.activeElement !==
                  ReactDOM.findDOMNode(this.refs.confirmPassword) && (
                  <FormFeedback invalid="true">
                    Looks like your password doesnt match.
                  </FormFeedback>
                )}
                <FormFeedback valid>Great! Your password matches.</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button
                  className="btn btn-lg btn-primary btn-block"
                  disabled={!this.canSubmitPassword()}
                  color="primary"
                  onClick={this.handlePasswordSubmit}
                >
                  Update Password
                </Button>
              </FormGroup>
            </Card>
          </Form>
        </div>
      </div>
    );
  }
}

export default AccountManagePage;
