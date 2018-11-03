import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import PReadsNavbar from '../../components/PReadsNavbar';
import Homefeed from '../../components/Homefeed';
import Exercises from '../../components/Exercises';
import Readings from '../../components/Readings';
import Games from '../../components/Games';
import Results from '../../components/Results';
import Catalog from '../../components/Catalog';
import CatalogCardBook from '../../components/CatalogCardBook';
import '../../styles/ReadingOlympics.scss';
import { getBooksByYearGrade } from '../../utils/api';

class ROYearView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
      // For testing -- mock data
      // books: [
      //   {
      //     name: "Stargirl",
      //     author: "Jerry Spinelli",
      //     id: "1",
      //     grade: "middle",
      //     year: "2019",
      //     description: "Star and girl"
      //   },
      //   {
      //     name: "Love, Stargirl",
      //     author: "Jerry Spinelli",
      //     id: "2",
      //     grade: "middle",
      //     year: "2019",
      //     description: "Star's perspective"
      //   },
      //   {
      //     name: "Eggs",
      //     author: "Jerry Spinelli",
      //     id: "3",
      //     grade: "middle",
      //     year: "2019",
      //     description: "Sunrise descriptions"
      //   },
      //   {
      //     name: "The Fox and the Star",
      //     author: "Joan Pitzburg",
      //     id: "4",
      //     grade: "middle",
      //     year: "2019",
      //     description: "Fox fox star star"
      //   }
      // ]
    };
  }

  navigationOptions = [
    {
      route: '/kids',
      name: 'Home',
      component: Homefeed
    },
    {
      route: '/kids/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      route: '/kids/readings',
      name: 'Readings',
      component: Readings
    },
    {
      route: '/kids/games',
      name: 'Games',
      component: Games
    },
    {
      route: '/kids/results',
      name: 'Results',
      component: Results
    }
  ];

  componentDidMount() {
    getBooksByYearGrade({
      year: this.props.match.params.year
    }).then(resJson => {
      this.setState({
        books: resJson.result
      });
    });
  }

  onClickBook = bookId => {
    this.props.history.push(`/ReadingOlympics/book/${bookId}`);
  };

  renderCatalogCardBook = book => {
    const onClick = () => this.onClickBook(book.id);
    return <CatalogCardBook book={book} onClickBook={onClick} />;
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <PReadsNavbar navOptions={this.navigationOptions} />
          </div>
        </Router>
        <div className="page-title">
          <h1>{`Reading Olympics: ${this.props.match.params.year}`}</h1>
        </div>
        {this.state.books && (
          <Catalog
            cards={this.state.books}
            renderFunc={this.renderCatalogCardBook}
          />
        )}
      </div>
    );
  }
}

export default ROYearView;
