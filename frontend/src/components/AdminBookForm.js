import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import '../styles/admin/AdminBookForm.scss';
import { createBook } from '../utils/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AdminBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      cover_url: '',
      year: '',
      grade: '',
      reader_url: '',
      errors: [],
      numSubmits: 0,
      shouldShowLoading: false,
      coverURLValid: true
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  testImage = e => {
    return new Promise(function(resolve, reject) {
      var timeout = 5000;
      var timer,
        img = new Image();
      img.onerror = img.onabort = function() {
        clearTimeout(timer);
        reject('error');
      };
      img.onload = function() {
        clearTimeout(timer);
        resolve('success');
      };
      timer = setTimeout(function() {
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = '//!!!!/test.jpg';
        reject('timeout');
      }, timeout);

      img.src = e.target.value;
      var patt = new RegExp('.(jpeg|jpg|gif|png)$');
      if (!patt.test(e.target.value)) {
        reject('error');
      }
    }).then(
      e => this.setState({ coverURLValid: true }),
      e => this.setState({ coverURLValid: false })
    );
  };

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (
      this.state.title !== '' &&
      this.state.author !== '' &&
      this.state.cover_url !== ''
    ) {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ shouldShowLoading: true });

    const { message, success, result } = await createBook({
      name: this.state.title,
      author: this.state.author,
      grade: parseInt(this.state.grade),
      year: parseInt(this.state.year),
      cover_url: this.state.cover_url,
      reader_url: this.state.reader_url
    });
    this.setState({ shouldShowLoading: false });
    if (success) {
      console.log(result);
    } else {
      // TODO: Display message if login wasn't successful

      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
      // this.handleAPIErrors(message);
      console.log(console.log(this.state.errors));
    }
  };

  render() {
    return (
      <Form className="book-form">
        {this.state.errors.map(({ message, key }) => {
          return (
            <Alert key={key} color="danger">
              {message}
            </Alert>
          );
        })}
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
          <Label>Year</Label>
          <Input
            type="text"
            name="year"
            onChange={this.handleChange}
            maxLength="4"
            pattern="[0-9]{4}"
            required
            placeholder="Ex: 2018"
          />
        </FormGroup>

        <FormGroup>
          <Label>Grade</Label>
          <Input
            type="text"
            name="grade"
            maxLength="2"
            pattern="[0-9]{2}"
            onChange={this.handleChange}
            placeholder="Ex: 8"
          />
        </FormGroup>

        <FormGroup>
          <Label>Book Image URL</Label>
          <Input
            type="text"
            name="cover_url"
            className={
              'form-control ' +
              (this.state.cover_url !== '' &&
                (this.state.coverURLValid ? 'is-valid' : 'is-invalid'))
            }
            onBlur={this.testImage}
            onChange={this.handleChange}
            placeholder="Ex: http://google.com/file.png"
          />
        </FormGroup>

        <FormGroup>
          <Label>Reader URL</Label>
          <Input
            type="text"
            name="reader_url"
            onChange={this.handleChange}
            placeholder="Ex: http://book.com/file.pdf"
          />
        </FormGroup>

        <FormGroup>
          <Button
            onClick={this.handleSubmit}
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
