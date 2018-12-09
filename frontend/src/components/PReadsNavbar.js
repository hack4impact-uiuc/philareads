import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';
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
          <NavbarBrand href="/">
            <img src={logo} width="80" alt="philareads" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="hamburger-color" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {this.navigationOptions.map(({ route, name }) => {
                // Maps each route component to navigation links in the Bootstrap navbar
                return (
                  <NavItem key={name}>
                    <NavLink href={route}>{name}</NavLink>
                  </NavItem>
                );
              })}
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
