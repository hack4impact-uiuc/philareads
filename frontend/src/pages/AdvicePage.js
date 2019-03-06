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
      adviceLoaded: false,
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
      this.setState({ adviceData: result['results'], adviceLoaded: true });
    } else {
      this.setState({ alert: message });
    }
  };

  renderAdviceCards = () => {
    if (this.state.adviceLoaded && this.state.adviceData.length === 0) {
      return (
        <Advice adviceCards="There is no advice right now. Check back later!" />
      );
    }

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
