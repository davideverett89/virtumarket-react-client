import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import useSimepleAuth from '../../../helpers/data/authData';

import './MyNavBar.scss';

const MyNavBar = ({
  authed,
  setAuthed,
}) => {
  // Boolean state variable to determine if the navbar is collapsing.
  const [isOpen, setIsOpen] = useState(false);
  // Event handler function that sets the isOpen variable to the opposite state.
  const toggle = () => setIsOpen(!isOpen);
  // Function borrowed from a custom hook to logout the user.
  const { logout } = useSimepleAuth();
  // Event handler function that calls the logout function from the custom hook.
  const logMeOut = (e) => {
    e.preventDefault();
    setAuthed(logout());
  };
  return (
    <div className="MyNavBar">
      <Navbar className="navbar-main" color="success" light expand="md">
        <NavbarBrand className="navbar-branding" href="/">
          <h3 className="logo-text text-white mb-0">VirtuMarket App</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto navbar-links" navbar>
          {
            authed && sessionStorage.getItem('userRole') === 'merchant'
              ? (
                <React.Fragment>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/home/merchants/${sessionStorage.getItem('roleId')}`}>Merchant Home</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to='/goods/add'>Add Good</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/accounts/${sessionStorage.getItem('userId')}`}>Profile</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn logout-btn" onClick={logMeOut}>Logout</NavLink>
                  </NavItem>
                </React.Fragment>
              )
              : (
                ''
              )
          }
          {
            authed && sessionStorage.getItem('userRole') === 'consumer'
              ? (
                <React.Fragment>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/home/consumers/${sessionStorage.getItem('roleId')}`}>Consumer Home</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/consumers/basket/${sessionStorage.getItem('roleId')}`}>Basket</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/accounts/${sessionStorage.getItem('userId')}`}>Profile</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn logout-btn" onClick={logMeOut}>Logout</NavLink>
                  </NavItem>
                </React.Fragment>
              )
              : (
                ''
              )
          }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

MyNavBar.propTypes = {
  authed: PropTypes.bool.isRequired,
  setAuthed: PropTypes.func.isRequired,
};

export default MyNavBar;
