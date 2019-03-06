import React, { Component } from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

class AdminNavigator extends Component {
  // TODO Highlight active page
  render() {
    return (
      <Card className="admin-navigator">
        <CardBody>
          <CardTitle>Navigation</CardTitle>
          <b>Account</b>
          <ul>
            <li>
              <Link to="/admin/manage_users">Upgrade User</Link>
            </li>
          </ul>
          <b>Page Settings</b>
          <ul>
            <li>
              <Link to="/admin/settings">Manage</Link>
            </li>
          </ul>
          <b>Books</b>
          <ul>
            <li>
              <Link to="/admin/book/csv_upload">Upload CSV</Link>
            </li>
            <li>
              <Link to="/admin/book/add">Add</Link>
            </li>
            <li>
              <Link to="/admin/book/edit">Edit</Link>
            </li>
          </ul>
          <b>Quizzes</b>
          <ul>
            <li>
              <Link to="/admin/quiz/add">Add</Link>
            </li>
            <li>
              <Link to="/admin/quiz/edit">Edit</Link>
            </li>
          </ul>
          <b>Parent Advice</b>
          <ul>
            <li>
              <Link to="/admin/advice/add">Add</Link>
            </li>
            <li>
              <Link to="/admin/advice/edit">Edit</Link>
            </li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

export default AdminNavigator;
