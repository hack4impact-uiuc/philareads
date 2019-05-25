import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getROCurrentYear } from '../../utils/api';

class RORedirectToCurrent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: undefined
    };
  }

  componentWillMount() {
    this.getROCurrentYear();
  }

  getROCurrentYear = async () => {
    try {
      const {
        success,
        result: { year }
      } = await getROCurrentYear();
      if (success) {
        this.setState({ currentYear: year });
      } else {
        // Handle failure by going back to RO homepage
        this.props.history.push('/readingolympics');
      }
    } catch (e) {
      console.error('error fetching current year', e);
    }
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
