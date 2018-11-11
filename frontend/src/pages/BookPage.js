import React, { Component } from 'react';
import Catalog from '../components/Catalog';
import BookInfo from '../components/BookInfo';
import { getBookData, getQuizzes } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row } from 'reactstrap';
class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: props.match.params.id,
      quizIndex: -1,
      quizID: -1,
      currentQuestions: []
    };
    this.fetchBookData();
    this.fetchQuizData();
  }

  fetchBookData = async () => {
    const { message, success, result } = await getBookData(
      this.props.match.params.id
    );
    if (success) {
      if (result['results'].length > 0) {
        this.setState({ bookData: result['results'][0] });
      } else {
        // User somehow navigated to a book page of invalid ID.
        // Redirect them to the homepage
        this.props.history.push('/');
      }
    } else {
      console.log(message);
    }
  };

  fetchQuizData = async () => {
    const { message, success, result } = await getQuizzes(
      this.props.match.params.id
    );
    if (success) {
      this.setState({ quizData: result['quizzes'] });
    } else {
      console.log(message);
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

  selectQuiz = id => {
    this.props.history.push(
      `/ReadingOlympics/book/${this.props.match.params.id}/${id}`
    );
  };

  renderFunc = card => {
    return (
      <Button
        color="success"
        className="btn btn-block"
        onClick={() => this.selectQuiz(card.id)}
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
    return (
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
    );
  }
}

export default BookPage;
