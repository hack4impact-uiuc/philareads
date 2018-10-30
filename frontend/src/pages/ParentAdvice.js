import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PReadsNavbar from '../components/PReadsNavbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Results from '../components/Results';
import Advice from '../components/Advice';
import philareads1 from './../images/phila_reads_cover.jpg';
import philareads2 from './../images/phila_reads_2.jpg';
import philareads3 from './../images/phila_reads_3.jpg';

class ParentsPage extends Component {
  navigationOptions = [
    {
      route: '/parents',
      name: 'Home',
      component: Homefeed
    },
    {
      route: '/parents/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      route: '/parents/readings',
      name: 'Readings',
      component: Readings
    },
    {
      route: '/parents/results',
      name: 'Results',
      component: Results
    }
    // ,
    // {
    //   route: '/parents/advice',
    //   name: 'Advice',
    //   component: Advice
    // }
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
    console.log(this.adviceCards);
    return (
      <div>
        <h1>Parents Page</h1>
        <Router>
          <div>
            <PReadsNavbar navOptions={this.navigationOptions} />
            {this.navigationOptions.map(({ route, name, component }) => {
              return <Route exact path={route} component={component} />;
            })}
            <Advice adviceCards={this.adviceCards} />
          </div>
        </Router>
      </div>
    );
  }
}

export default ParentsPage;
