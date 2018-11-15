import React, { Component } from 'react';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
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
          <CardText>
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
          </CardText>
          <CardText>
            Quizzes
            <ul>
              <li>
                <a href="/admin/quiz/add">Add</a>
              </li>
              <li>
                <a href="/admin/quiz/edit">Edit</a>
              </li>
            </ul>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default AdminNavigator;
