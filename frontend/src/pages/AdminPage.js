import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class AdminPage extends Component {
  onDrop(files) {
    this.setState({
      files
    });
  }
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <div>
          Features:
          <ul>
            <li>Define which books are in which year's Reading Olympics</li>
            <li>Define a book</li>
            <li>Upload a new quiz for a book</li>
            <li>Change parent advice information</li>
          </ul>
        </div>
        <Dropzone onDrop={this.onDrop.bind(this)} />
      </div>
    );
  }
}

export default AdminPage;
