import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import logo from '../images/philareadslogo_transparent.png';
import '../styles/PReadsNavbar.scss';
export default class PReadsNavbar extends React.Component {
  navigationOptions = [
    {
      route: '/',
      name: 'Home'
    },
    {
      route: '/about',
      name: 'About'
    },
    {
      route: '/ReadingOlympics',
      name: 'Reading Olympics'
    },
    {
      route: '/parents',
      name: 'For Parents'
    },
    {
      route: '/search',
      name: 'Search'
    }
  ];

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
        <Navbar className="navbar-light" expand="md">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="80" alt="philareads" />
          </Link>
          <NavbarToggler onClick={this.toggle} className="hamburger-color" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {this.navigationOptions.map(({ route, name }) => {
                // Maps each route component to navigation links in the Bootstrap navbar
                return (
                  <NavItem key={name}>
                    <Link to={route} className="nav-link">
                      {name}
                    </Link>
                  </NavItem>
                );
              })}
              {!this.isLoggedIn() && (
                <NavItem>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </NavItem>
              )}
              {!this.isLoggedIn() && (
                <NavItem>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </NavItem>
              )}
            </Nav>

            {this.isLoggedIn() && (
              <UncontrolledDropdown>
                <DropdownToggle tag="a" className="nav-link" caret>
                  Account
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag="a" href="/profile/badges">
                    Profile
                  </DropdownItem>
                  <DropdownItem tag="a" href="/account">
                    Settings
                  </DropdownItem>
                  <DropdownItem tag="a" href="/logout">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
