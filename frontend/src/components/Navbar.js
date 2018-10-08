import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        {this.props.navOptions.map(({ route, name, component }) => {
          return (
            <Link to={route}>
              {name}
              &nbsp;&nbsp;&nbsp;
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Navbar;
