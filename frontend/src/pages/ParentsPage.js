import React, { Component } from 'react';
import Advice from '../components/Advice';
import philareads1 from './../images/phila_reads_cover.jpg';
import philareads2 from './../images/phila_reads_2.jpg';
import philareads3 from './../images/phila_reads_3.jpg';
import '../styles/ParentsPage.scss';
class ParentsPage extends Component {
  navigationOptions = [
    {
      route: '/parents',
      name: 'Advice',
      component: Advice
    }
  ];

  adviceCards = [
    {
      title: 'An Introduction',
      subtitle:
        'Philadelphia reads is raising a city of readers for a better tomorrow!',
      text:
        'The mission of Philadelphia READS is to “raise a city of readers” through quality out of school time programs focused to get children and youth to read on or above grade level by grade 4.',
      smallText: '',
      button: 'More',
      image: philareads1
    },
    {
      title: 'Need Advice?',
      subtitle: "Here's our first tip!",
      text:
        "Being a part of your child's learning process is very effective. For example, read aloud with them and ask questions about stories as you read along. this will promote critical thinking and recollection quickly.",
      smallText: 'Last updated 3 mins ago',
      button: 'More',
      image: philareads2
    },
    {
      title: 'Health Matters Too!',
      subtitle:
        'Reading every day will help your child get better and better over time, however health is also important!',
      text:
        "A healthy diet, exercise routine, and sleep schedule will help your child's brain be ready to intake more information and do some heavy brain lifting 😃",
      button: 'More',
      image: philareads3
    },
    {
      title: 'Example',
      subtitle: 'This example has no buttons or corresponding images.',
      text: "That's okay though. Images aren't necessary for making a card 🙂",
      smallText: ''
    }
  ];

  render() {
    return (
      <div className="parents-page">
        <h1 class="page-title">Parents Page</h1>
        <div>
          <Advice adviceCards={this.adviceCards} />
        </div>
      </div>
    );
  }
}

export default ParentsPage;
