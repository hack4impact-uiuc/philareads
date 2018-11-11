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
      quizID: props.match.params.quizID,
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
      this.setState({ bookData: result['results'][0] });
    } else {
      console.log(message);
    }
  };

  fetchQuizData = async () => {
    const { id, quizID } = this.props.match.params;
    const { message, success, result } = await getQuizzes(id);
    if (success) {
      console.log('A single quiz');
      this.setState({
        quizData: result['quizzes'].filter(
          quiz => quiz['quizzes'][0]['quiz_id'].toString() === quizID
        )[0]
      });
    } else {
      console.log(message);
    }
  };

  getQuestions = () => {
    console.log(this.state.quizData);
    return this.state.quizData['quizzes'];
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
            <h1 className="quiz-title">{this.state.quizData['name']}</h1>
            <QuizViewer
              quizID={this.props.match.params.quizID}
              questionList={this.getQuestions()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default QuizPage;
