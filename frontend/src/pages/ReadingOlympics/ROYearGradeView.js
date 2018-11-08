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
import {
  URLParamToString,
  URLParamToQueryParam
} from '../../utils/formatHelpers';

class ROYearGradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
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
    const { year, grade } = this.props.match.params;
    getBooksByYearGrade({ year, grade: URLParamToQueryParam(grade) }).then(
      resJson => {
        if (resJson.success) {
          this.setState({
            books: resJson.result.results
          });
        } else {
          console.log(resJson.message);
        }
      }
    );
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
          <h1>{`Reading Olympics: ${URLParamToString(
            this.props.match.params.grade
          )} ${this.props.match.params.year}`}</h1>
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

export default ROYearGradeView;
