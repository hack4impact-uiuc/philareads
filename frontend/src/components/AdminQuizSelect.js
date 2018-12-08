import React, { Component } from 'react';
import { getAllQuizzes } from '../utils/api';
class AdminQuizSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedQuiz: null,
      quizzes: []
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
      this.setState({ quizzes: sortedByName, currentSelectedQuiz: null });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }]
      }));
      //TODO: display errors if fetch doesn't work
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
    return (
      <div className="quiz-select">
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
      </div>
    );
  }
}

export default AdminQuizSelect;
