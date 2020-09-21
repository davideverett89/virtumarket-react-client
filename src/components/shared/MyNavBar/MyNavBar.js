import React, { useState } from 'react';

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
  roleId,
  uid,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { logout } = useSimepleAuth();
  const logMeOut = (e) => {
    e.preventDefault();
    logout();
    setAuthed(false);
  };
  return (
    <div className="MyNavBar border border-dark">
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
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/home/merchants/${roleId}`}>Merchant Home</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to='/goods/add'>Add Good</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/accounts/${uid}`}>Profile</NavLink>
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
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/home/consumers/${roleId}`}>Consumer Home</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/consumers/basket/${roleId}`}>Basket</NavLink>
                  </NavItem>
                  <NavItem className="mx-1">
                    <NavLink className="btn nav-btn" tag={RRNavLink} to={`/accounts/${uid}`}>Profile</NavLink>
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

export default MyNavBar;
