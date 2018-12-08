import React, { Component } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
class AdminNavigator extends Component {
  onDrop(files) {
    this.setState({
      files
    });
  }
  render() {
    return (
      <Card className="admin-navigator">
        <CardBody>
          <CardTitle>Navigation</CardTitle>
          Account
          <ul>
            <li>
              <a href="/admin/manage_users">Upgrade User</a>
            </li>
          </ul>
          Books
          <ul>
            <li>
              <a href="/admin/book/csv_upload">Upload CSV</a>
            </li>
            <li>
              <a href="/admin/book/add">Add</a>
            </li>
            <li>
              <a href="/admin/book/edit">Edit</a>
            </li>
          </ul>
          Quizzes
          <ul>
            <li>
              <a href="/admin/quiz/add">Add</a>
            </li>
            <li>
              <a href="/admin/quiz/edit">Edit</a>
            </li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

export default AdminNavigator;
