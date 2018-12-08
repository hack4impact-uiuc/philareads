import React, { Component } from 'react';
import Advice from '../components/Advice';
import philareads1 from './../images/phila_reads_cover.jpg';
import philareads2 from './../images/phila_reads_2.jpg';
import philareads3 from './../images/phila_reads_3.jpg';
import { getAdvice } from '../utils/api';
import '../styles/ParentsPage.scss';
class ParentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adviceID: props.match.params.id
    };
    this.fetchAdviceData();
  }

  navigationOptions = [
    {
      route: '/parents',
      name: 'Advice',
      component: Advice
    }
  ];

  fetchAdviceData = async () => {
    const { message, success, result } = await getAdvice(
      this.props.match.params.id
    );
    if (success) {
      if (result['results'].length > 0) {
        this.setState({ adviceData: result['results'][0]['text'] });
        console.log(this.state.adviceData);
      } else {
        // User somehow navigated to a book page of invalid ID.
        // Redirect them to the main ReadingOlympics page
        this.props.history.push('/ReadingOlympics');
      }
    } else {
      this.setState({ alert: message });
    }
  };

  render() {
    return (
      <div className="parents-page">
        <h1 class="page-title">Parents Page</h1>
        <div>
          <Advice adviceCards={this.state.adviceData} />
        </div>
      </div>
    );
  }
}

export default ParentsPage;
