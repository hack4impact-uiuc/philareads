import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PReadsNavbar from '../components/PReadsNavbar';
import Homefeed from '../components/Homefeed';
import Exercises from '../components/Exercises';
import Readings from '../components/Readings';
import Results from '../components/Results';
import Advice from '../components/Advice';
import pats_cat from './../images/pats_cat.PNG';
import pretty_cat from './../images/pretty_cat.JPG';
import i_love_kanye from './../images/i_love_kanye.jpg';

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
      title: "Pat's Fat Cat",
      subtitle: 'it is a tabby',
      text: "pat's cat is so chubby but so cute. i want to play with it",
      smallText: '',
      button: 'More',
      image: pats_cat
    },
    {
      title: 'This is quite a beautiful cat',
      subtitle:
        "I found this cat's picture in the Catspotting facebook group and it was so nice i decided to save it on my phone.",
      text:
        'i want a cat but im not responsible enough to take care of my own life how can i take care of another one',
      smallText: 'Last updated 3 mins ago',
      button: 'More',
      image: pretty_cat
    },
    {
      title: "I just don't want to be a terrible person anymore",
      subtitle: "here's a picture of something that i have not decided on yet",
      text:
        "there's a lot of goddamn text options in these cards idk if we need all of them lol",
      smallText: 'everyone dies. why hurry',
      button: 'sad',
      image: i_love_kanye
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
