import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { getAdvice } from '../../utils/api';

class AdminAdviceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAdvice: null,
      allAdvice: [],
      errors: [],
      numSubmits: 0
    };
    this.getAdvice();
  }
  getAdvice = async () => {
    const { message, success, result } = await getAdvice();
    if (success) {
      const sortedByName = result['results'].sort(
        (a, b) => (a['text'].toLowerCase() > b['text'].toLowerCase() ? 1 : -1)
      );
      this.setState({ allAdvice: sortedByName, errors: [] });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1
      }));
    }
  };

  changeSelection = e => {
    this.setState({
      selectedAdvice: this.state.allAdvice[e.target.selectedIndex - 1]
    });
    // Subtract one from the selected index since we now have a disabled first field for selection
    this.props.handleSelect(this.state.allAdvice[e.target.selectedIndex - 1]);
  };

  render() {
    const hasErrors = this.state.errors.length > 0;
    return (
      <div className="advice-select">
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
            defaultValue="---Select Parent Advice---"
          >
            <option disabled>---Select Parent Advice---</option>
            {this.state.allAdvice.map((element, id) => {
              return (
                <option key={element['id']} value={element['id']}>
                  {element['text']}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  }
}

export default AdminAdviceSelect;
