import React, { Component } from 'react';
import BookInfo from '../components/BookInfo';
import QuizViewer from '../components/QuizViewer';
import { getBookData, getQuizzes, postQuizResults } from '../utils/api';
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
    return this.state.quizData['quizzes'];
  };

  dataLoaded = () => {
    return (
      this.state.bookData !== undefined && this.state.quizData !== undefined
    );
  };

  finishAttempt = questionProps => {
    const num_total = questionProps.length;
    const num_correct = questionProps.reduce(
      (acc, qnProp) => (qnProp['answeredCorrectly'] ? acc + 1 : acc),
      0
    );
    const questionResults = questionProps.map((qnProp, idx) => {
      return {
        user_answer: '',
        correct_answer: '',
        correct: qnProp['answeredCorrectly'],
        question_num: idx
      };
    });
    let quizResults = {
      quiz_id: this.state.quizID,
      num_correct: num_correct,
      num_total: num_total,
      date_taken: 'temp_string',
      attempted_questions: questionResults
    };
    postQuizResults(quizResults);
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
            <QuizViewer
              quizID={this.props.match.params.quizID}
              questionList={this.getQuestions()}
              quizName={this.state.quizData['name']}
              finishAttempt={this.finishAttempt}
            />
          </div>
        )}
      </div>
    );
  }
}

export default QuizPage;
