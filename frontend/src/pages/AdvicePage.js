import React, { Component } from 'react';
import Advice from '../components/Advice';
import { Alert, Container } from 'reactstrap';
import { getAdvice } from '../utils/api';
class AdvicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adviceID: props.match.params.id,
      adviceData: [],
      alert: null
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
        this.setState({ adviceData: result['results'] });
      } else {
        // Redirect them to the main ReadingOlympics page
        this.props.history.push('/ReadingOlympics');
      }
    } else {
      this.setState({ alert: message });
    }
  };

  renderAdviceCards = () => {
    return this.state.adviceData.map(advice => (
      <Advice adviceCards={advice['text']} />
    ));
  };

  render() {
    let header;
    if (this.state.alert !== null) {
      header = <Alert color="danger">{this.state.alert}</Alert>;
    }

    return (
      <Container className="parents-page">
        <h1 class="page-title">Parents Page</h1>
        {header}
        {this.renderAdviceCards()}
      </Container>
    );
  }
}

export default AdvicePage;
