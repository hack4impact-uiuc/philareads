import React, { Component } from 'react';
import { getAllBooks } from '../utils/api';

class AdminBookSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedBook: null,
      books: []
    };
    this.getBooks();
  }
  getBooks = async () => {
    const { message, success, result } = await getAllBooks();
    if (success) {
      const sortedByName = result['results'].sort(
        (a, b) => (a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1)
      );
      this.setState({ books: sortedByName });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }]
      }));
      //TODO: display errors if fetch doesn't work
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
    return (
      <div>
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
      </div>
    );
  }
}

export default AdminBookSelect;
