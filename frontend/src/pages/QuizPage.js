import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookInfo from '../components/BookInfo';
import QuizViewer from '../components/QuizViewer';
import { getBookData, getQuizzes } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row } from 'reactstrap';
import '../styles/QuizPage.scss';

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: props.match.params.id,
      quizData: getQuizzes(props.match.params.id),
      quizID: props.match.params.quizID,
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
            <h1 className="quiz-title">
              Quiz {this.props.match.params.quizID}
            </h1>
            <QuizViewer
              quizID={this.props.match.params.quizID}
              questionList={this.state.currentQuestions}
            />
          </div>
        )}
      </div>
    );
  }
}

export default QuizPage;
