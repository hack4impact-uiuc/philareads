import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getROCurrentYear } from '../../utils/api';

class RORedirectToCurrent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: undefined
    };
    this.getROCurrentYear();
  }

  getROCurrentYear = async () => {
    const {
      success,
      result: { results },
      message
    } = await getROCurrentYear();
    this.setState({ currentYear: results });
  };

  render() {
    const { currentYear } = this.state;
    if (currentYear === undefined) {
      return null;
    }

    const redirectURL = window.location.pathname.replace(
      'current',
      currentYear
    );

    return (
      <div className="reading-olympics">
        <Redirect to={redirectURL} />
      </div>
    );
  }
}

export default RORedirectToCurrent;
