import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { getAllQuizzes } from '../utils/api';
class AdminQuizSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedQuiz: null,
      quizzes: [],
      errors: [],
      numSubmits: 0
    };
    this.getQuizzes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quiz_id !== this.props.quiz_id) {
      this.getQuizzes();
    }
  }
  getQuizzes = async () => {
    const { message, success, result } = await getAllQuizzes(
      this.props.quiz_id
    );
    if (success) {
      const sortedByName = result['quizzes'].sort(
        (a, b) => (a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1)
      );
      this.setState({
        quizzes: sortedByName,
        currentSelectedQuiz: null,
        errors: []
      });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1
      }));
    }
  };

  changeSelection = e => {
    this.setState({
      currentSelectedQuiz: this.state.quizzes[e.target.selectedIndex - 1]
    });
    // Subtract one from the selected index since we now have a disabled first field for book selection
    this.props.handleQuizSelect(this.state.quizzes[e.target.selectedIndex - 1]);
  };

  render() {
    const hasErrors = this.state.errors.length > 0;
    return (
      <div className="quiz-select">
        {this.state.errors.map(({ message, key }) => {
          return (
            <Alert key={key} color="danger">
              {message}
            </Alert>
          );
        })}
        {!hasErrors && (
          <select
            className="form-control"
            onChange={this.changeSelection}
            value={
              this.state.currentSelectedQuiz !== null
                ? this.state.currentSelectedQuiz.name
                : '---Select Quiz---'
            }
          >
            <option disabled>---Select Quiz---</option>
            {this.state.quizzes.map((element, id) => {
              return (
                <option key={id} value={element['id']}>
                  {element['name']}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  }
}

export default AdminQuizSelect;
