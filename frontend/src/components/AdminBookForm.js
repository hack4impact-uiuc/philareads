import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import '../styles/admin/AdminBookForm.scss';
class AdminBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      image_url: '',
      submitClicked: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (
      this.state.title !== '' &&
      this.state.author !== '' &&
      this.state.image_url !== ''
    ) {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  submitForm = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Form className="book-form">
        <FormGroup>
          <Label>Book Title</Label>
          <Input
            type="text"
            name="title"
            onChange={this.handleChange}
            placeholder="Ex: The Adventures of Huckleberry Finn"
          />
        </FormGroup>
        <FormGroup>
          <Label>Book Author</Label>
          <Input
            type="text"
            name="author"
            onChange={this.handleChange}
            placeholder="Ex: Mark Twain"
          />
        </FormGroup>
        <FormGroup>
          <Label>Book Image URL</Label>
          <Input
            type="text"
            name="image_url"
            onChange={this.handleChange}
            placeholder="Ex: http://google.com/"
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="submit"
            onClick={this.submitForm}
            disabled={!this.canSubmitWithoutError()}
            color="primary"
          >
            Add Book
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default AdminBookForm;
