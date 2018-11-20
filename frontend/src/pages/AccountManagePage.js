import React, { Component } from 'react';
import AccountManage from '../components/AccountManage';
import { getUserInfo } from '../utils/api';

class AccountManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const { name, email } = await getUserInfo();
    this.setState({ name: name, email: email });
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

                  <input
                    className="btn btn-lg btn-dark btn-block"
                    value="Update Profile"
                    type="submit"
                  />
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
                    />
                  </div>

                  <h5> New Password </h5>
                  <div className="form-group has-error">
                    <input
                      className="form-control input-lg"
                      name="new_password"
                      type="text"
                    />
                  </div>

                  <h5> Repeat New Password </h5>
                  <div className="form-group has-error">
                    <input
                      className="form-control input-lg"
                      name="repeated_new_password"
                      type="text"
                    />
                  </div>

                  <input
                    className="btn btn-lg btn-dark btn-block"
                    value="Update Password"
                    type="submit"
                  />
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
