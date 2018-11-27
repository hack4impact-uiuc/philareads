import React, { Component } from 'react';
import AccountManage from '../components/AccountManage';
import { getUserData, postUserData, updatePassword } from '../utils/api';
import { Button } from 'reactstrap';

class AccountManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      current_password: '',
      new_password: '',
      repeated_new_password: '',
      match_error: '',
      curr_password_error: '',
      message: '',
      status: '',
      password_success: true,
      data: ''
    };
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const { message, success, result } = await getUserData();
    this.setState({ name: result['name'], email: result['email'] });
    console.log(message);
    console.log(success);
    console.log(result);
  };

  handleProfileChange = () => {
    let userData = {
      name: this.state.name,
      email: this.state.email
    };
    postUserData(userData);
  };

  handlePasswordChange = async () => {
    this.setState({ password_success: true });

    if (this.state.new_password === this.state.repeated_new_password) {
      this.setState({ match_error: '' });
    } else {
      this.setState({
        match_error: 'Passwords do not match',
        password_success: false
      });
    }

    let passwordData = {
      old_password: this.state.current_password,
      new_password: this.state.new_password
    };

    //updatePassword(passwordData);

    const { message, status, data } = await updatePassword(passwordData);
    this.setState({ message: message, status: status, data: data });

    if (status === 400) {
      this.setState({
        curr_password_error: 'Invalid Password',
        password_success: false
      });
    } else {
      this.setState({
        curr_password_error: '',
        password_success: true
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card card-body">
                <h3 className="text-center mb-4">Edit your profile</h3>
                <fieldset>
                  <div className="form-group has-error">
                    <h5> Name </h5>
                    <input
                      className="form-control input-lg"
                      defaultValue={this.state.name}
                      name="name"
                      type="text"
                      onChange={txt =>
                        this.setState({ name: txt.target.value })
                      }
                    />
                  </div>
                  <div className="form-group has-error">
                    <h5> Email </h5>
                    <input
                      className="form-control input-lg"
                      defaultValue={this.state.email}
                      name="email"
                      type="text"
                      onChange={txt =>
                        this.setState({ email: txt.target.value })
                      }
                    />
                  </div>
                  <Button
                    className="btn btn-lg btn-dark btn-block"
                    onClick={this.handleProfileChange}
                    size="lg"
                    block
                  >
                    Update Profile
                  </Button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card card-body">
                <h3 className="text-center mb-4">Change Password</h3>
                <fieldset>
                  <h5> Current Password </h5>
                  <div className="form-group has-error">
                    <input
                      className="form-control input-lg"
                      name="current_password"
                      type="text"
                      onChange={txt =>
                        this.setState({ current_password: txt.target.value })
                      }
                    />
                    <div className="invalid-feedback d-block">
                      {this.state.curr_password_error}
                    </div>
                  </div>

                  <h5> New Password </h5>
                  <div className="form-group has-error">
                    <input
                      className="form-control input-lg"
                      name="new_password"
                      type="text"
                      onChange={txt =>
                        this.setState({ new_password: txt.target.value })
                      }
                    />
                  </div>

                  <h5> Repeat New Password </h5>
                  <div className="form-group has-error">
                    <input
                      className="form-control input-lg"
                      name="repeated_new_password"
                      type="text"
                      onChange={txt =>
                        this.setState({
                          repeated_new_password: txt.target.value
                        })
                      }
                    />
                    <div className="invalid-feedback d-block">
                      {this.state.match_error}
                    </div>
                  </div>
                  <Button
                    className="btn btn-lg btn-dark btn-block"
                    onClick={this.handlePasswordChange}
                    size="lg"
                    block
                  >
                    Update Password
                  </Button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountManagePage;
