import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
  Col,
  Row,
  FormFeedback
} from 'reactstrap';
import '../styles/admin/AdminBookForm.scss';
import { URLParamToString } from '../utils/formatHelpers';
import { createBook, editBook } from '../utils/api.js';

class AdminBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      wasPublished: false,
      published: false,
      author: '',
      cover_url: '',
      year: '',
      grade: '',
      errors: [],
      numSubmits: 0,
      coverURLValid: null
    };
  }

  updateStateForProps = () => {
    if (
      this.props.currentBook != null &&
      this.state.id !== this.props.currentBook.id
    ) {
      this.setState(
        {
          title: this.props.currentBook.name,
          wasPublished: this.props.currentBook.published,
          published: this.props.currentBook.published,
          author: this.props.currentBook.author,
          cover_url: this.props.currentBook.cover_url,
          year: this.props.currentBook.year,
          grade: this.props.currentBook.grade,
          id: this.props.currentBook.id
        },
        () => {
          this.testImage();
          // Can't reuse the testBookURL method since it relies on an event
          var patt = new RegExp(
            /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
          );
          this.setState({ bookURLValid: patt.test(this.state.reader_url) });
        }
      );
    }
  };
  componentDidUpdate(previousProps) {
    this.updateStateForProps();
  }

  componentDidMount() {
    this.updateStateForProps();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  testImage = () => {
    var cover_url = this.state.cover_url;

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
      img.src = cover_url;
    }).then(
      e => this.setState({ coverURLValid: true }),
      e => {
        return this.setState({ coverURLValid: false });
      }
    );
  };

  canSubmitWithoutError() {
    var canSubmitWithoutError = false;
    if (
      this.state.title !== '' &&
      this.state.author !== '' &&
      this.state.year !== '' &&
      this.state.grade !== '' &&
      !isNaN(this.state.year) &&
      !(this.state.cover_url !== '' && !this.state.coverURLValid)
    ) {
      canSubmitWithoutError = true;
    }
    return canSubmitWithoutError;
  }

  getSubmitButtonString = () => {
    if (this.state.published && !this.state.wasPublished) {
      return `${this.props.type} and Publish`;
    } else if (!this.state.published && this.state.wasPublished) {
      if (this.props.type === 'Edit') {
        return `${this.props.type} and Unpublish`;
      }
    } else {
      return this.props.type;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const apiCall = this.props.type === 'Edit' ? editBook : createBook;
    const additionalBookData =
      this.props.type === 'Edit' ? { book_id: this.state.id } : {};
    const { message, success } = await apiCall({
      name: this.state.title,
      author: this.state.author,
      grade: this.state.grade,
      year: parseInt(this.state.year),
      cover_url: this.state.cover_url,
      published: this.state.published,
      ...additionalBookData
    });
    if (success) {
      this.props.handleSuccess();
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
    }
  };

  togglePublish = e => {
    this.setState({
      published: e.target.checked
    });
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
            value={this.state.title}
          />
        </FormGroup>
        <FormGroup>
          <Label className="checkbox-label">Published?</Label>
          <Input
            className="published-checkbox"
            type="checkbox"
            name="published"
            onChange={this.togglePublish}
            checked={this.state.published}
          />
        </FormGroup>
        <FormGroup>
          <Label>Book Author</Label>
          <Input
            type="text"
            name="author"
            onChange={this.handleChange}
            placeholder="Ex: Mark Twain"
            value={this.state.author}
          />
        </FormGroup>

        <FormGroup inline={true} className="no-margin">
          <Row>
            <Col lg="6" className="year-grade">
              <Label>Year</Label>
              <Input
                type="text"
                name="year"
                className={
                  'form-control ' +
                  (this.state.year !== '' &&
                    (isNaN(this.state.year) ? 'is-invalid' : 'is-valid'))
                }
                onChange={this.handleChange}
                maxLength="4"
                pattern="[0-9]{4}"
                required
                placeholder="Ex: 2018"
                value={this.state.year}
              />
              <FormFeedback invalid="true">
                The year has to be a number.
              </FormFeedback>
            </Col>
            <Col lg="6" className="year-grade">
              <Label>Grade</Label>
              <Input
                type="select"
                name="grade"
                className={'form-control'}
                onChange={this.handleChange}
                value={this.state.grade}
                required
              >
                <option disabled hidden value="" />
                <option value="Middle">{URLParamToString('Middle')}</option>
                <option value="Intermediate">
                  {URLParamToString('intermediate')}
                </option>
              </Input>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Label>Book Image URL</Label>
          <Input
            type="text"
            name="cover_url"
            className={
              'form-control ' +
              (this.state.coverURLValid !== null &&
                this.state.cover_url !== '' &&
                (this.state.coverURLValid ? 'is-valid' : 'is-invalid'))
            }
            onBlur={this.testImage}
            onChange={this.handleChange}
            value={this.state.cover_url}
            placeholder="Ex: http://google.com/file.png"
          />
          <FormFeedback invalid="true">
            We're having trouble loading that image.
          </FormFeedback>
          <FormFeedback valid>Image looks good!</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Button
            onClick={this.handleSubmit}
            disabled={!this.canSubmitWithoutError()}
            color={this.props.type === 'Edit' ? 'warning' : 'primary'}
          >
            {this.getSubmitButtonString()} Book
          </Button>
          {this.props.type === 'Edit' && (
            <Button
              disabled={!this.props.currentBook}
              onClick={this.props.handleDeletePress}
              color="danger"
            >
              Delete{' '}
              {this.props.currentBook &&
                '"' + this.props.currentBook.name + '"'}
            </Button>
          )}
        </FormGroup>
      </Form>
    );
  }
}

export default AdminBookForm;
