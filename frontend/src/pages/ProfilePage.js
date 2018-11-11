import React, { Component } from 'react';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Profile Page</h1>
        <div>
          Features:
          <ul>
            <li>Change account email</li>
            <li>Change password / forgot password flow</li>
            <li>Change name</li>
            <li>View analysis of quiz performance</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
