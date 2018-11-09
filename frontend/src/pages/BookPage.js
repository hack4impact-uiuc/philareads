import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PReadsNavbar from '../components/PReadsNavbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Games from '../components/Games';
import Results from '../components/Results';
import Catalog from '../components/Catalog';
import Login from '../components/Login';
import CatalogCard from '../components/CatalogCard';
import BookInfo from '../components/BookInfo';
import QuizViewer from '../components/QuizViewer';
import { getBookData, getQuizzes } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row } from 'reactstrap';
import '../styles/BookPage.scss';
class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: props.match.params.id,
      quizData: getQuizzes(props.match.params.id),
      quizIndex: -1,
      quizID: -1,
      currentQuestions: []
    };
    this.fetchBookData();
  }

  fetchBookData = async () => {
    const { message, success, result } = await getBookData(
      this.props.match.params.id
    );
    console.log(result);
    this.setState({ bookData: result['results'][0] });
  };

  getCards = () => {
    var cards = [];
    for (var i in this.state.quizData) {
      cards.push({
        title: this.state.quizData[i]['name'],
        id: this.state.quizData[i]['id'],
        index: i
      });
    }
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
  render() {
    return (
      <div>
        {this.state.bookData === undefined && (
          <Row>
            <FontAwesomeIcon
              className="icon spinner"
              icon="spinner"
              pulse
              size="10x"
            />
          </Row>
        )}
        {this.state.bookData !== undefined && (
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
