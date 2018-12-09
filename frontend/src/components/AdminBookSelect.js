import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { getAllBooks } from '../utils/api';

class AdminBookSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedBook: null,
      books: [],
      errors: [],
      numSubmits: 0
    };
    this.getBooks();
  }
  getBooks = async () => {
    const { message, success, result } = await getAllBooks();
    if (success) {
      const sortedByName = result['results'].sort(
        (a, b) => (a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1)
      );
      this.setState({ books: sortedByName, errors: [] });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1
      }));
    }
  };

  changeSelection = e => {
    this.setState({
      currentSelectedBook: this.state.books[e.target.selectedIndex - 1]
    });
    // Subtract one from the selected index since we now have a disabled first field for book selection
    this.props.handleBookSelect(this.state.books[e.target.selectedIndex - 1]);
  };

  render() {
    const hasErrors = this.state.errors.length > 0;
    return (
      <div className="book-select">
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
            defaultValue="---Select Book---"
          >
            <option disabled>---Select Book---</option>
            {this.state.books.map((element, id) => {
              return (
                <option key={element['id']} value={element['ida']}>
                  {element['name'] + ' (' + element['author'] + ')'}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  }
}

export default AdminBookSelect;
