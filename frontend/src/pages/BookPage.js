import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Alert } from 'reactstrap';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

import Catalog from '../components/catalog/Catalog';
import BookInfo from '../components/BookInfo';
import { getBookData, getQuizzes } from '../utils/api';

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookID: props.match.params.id,
      quizIndex: -1,
      quizID: -1,
      currentQuestions: [],
      alert: null
    };
  }

  componentWillMount() {
    this.fetchBookData();
    this.fetchQuizData();
  }

  fetchBookData = async () => {
    try {
      const { message, success, result } = await getBookData(
        this.props.match.params.id
      );
      if (success) {
        if (result['results'].length > 0) {
          this.setState({ bookData: result['results'][0] });
        } else {
          // User somehow navigated to a book page of invalid ID.
          // Redirect them to the main ReadingOlympics page
          this.props.history.push('/ReadingOlympics');
        }
      } else {
        this.setState({ alert: message });
      }
    } catch (e) {
      console.error('error fetch book data', e);
    }
  };

  fetchQuizData = async () => {
    try {
      const { message, success, result } = await getQuizzes(
        this.props.match.params.id
      );
      if (success) {
        this.setState({ quizData: result['quizzes'] });
      } else {
        this.setState({ alert: message });
      }
    } catch (e) {
      console.error('error fetch quiz data', e);
    }
  };

  getCards = () => {
    let cards = [];
    this.state.quizData.forEach((quiz, idx) => {
      cards.push({
        title: quiz['name'],
        id: quiz['quizzes'][0]['quiz_id'],
        index: idx
      });
    });
    return cards;
  };

  renderFunc = card => {
    return (
      <Button
        color="success"
        className="btn btn-block"
        tag={Link}
        to={`/ReadingOlympics/book/${this.props.match.params.id}/${card.id}`}
      >
        {card.title}
      </Button>
    );
  };

  dataLoaded = () => {
    return (
      this.state.bookData !== undefined && this.state.quizData !== undefined
    );
  };

  render() {
    let header;
    if (this.state.alert !== null) {
      header = <Alert color="danger">{this.state.alert}</Alert>;
    }
    return (
      <DocumentTitle title="Book">
        <div>
          {!this.dataLoaded() && (
            <Row>
              <FontAwesomeIcon
                className="icon spinner"
                icon="spinner"
                pulse
                size="10x"
              />
            </Row>
          )}
          {this.dataLoaded() && (
            <div>
              {header}
              <BookInfo bookObject={this.state.bookData} />
              <h1 className="quiz-title">Quizzes</h1>
              <Catalog
                className="quiz-catalog"
                renderFunc={this.renderFunc}
                cards={this.getCards()}
              />
            </div>
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export default BookPage;
