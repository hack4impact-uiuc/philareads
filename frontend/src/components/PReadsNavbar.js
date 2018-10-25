import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Cookies from 'universal-cookie';

export default class PReadsNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  isLoggedIn() {
    const cookies = new Cookies();
    return cookies.get('jwt') !== undefined;
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href={this.props.homePage}>
            Philadelphia Reads
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {this.props.navOptions.map(({ route, name, component }) => {
                // Maps each route component to navigation links in the Bootstrap navbar
                return (
                  <NavItem>
                    <NavLink href={route}>{name}</NavLink>
                  </NavItem>
                );
              })}
              {this.isLoggedIn() && (
                <NavItem>
                  <NavLink href={'/logout'}>Logout</NavLink>
                </NavItem>
              )}
              {!this.isLoggedIn() && (
                <NavItem>
                  <NavLink href={'/login'}>Login</NavLink>
                </NavItem>
              )}
              {!this.isLoggedIn() && (
                <NavItem>
                  <NavLink href={'/register'}>Register</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
