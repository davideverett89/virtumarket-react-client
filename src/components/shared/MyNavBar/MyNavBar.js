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

const MyNavBar = ({ authed, setAuthed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { logout } = useSimepleAuth();
  const logMeOut = (e) => {
    e.preventDefault();
    logout();
    setAuthed(false);
  };
  return (
    <div className="MyNavbar">
      <Navbar color="success" light expand="md">
        <NavbarBrand href="/">
          <h3 className="text-white">VirtuMarket App</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {
            authed && localStorage.getItem('userRole') === 'merchant'
              ? (
              <Nav className="ml-auto" navbar>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/home'>Merchant Home</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/goods/add'>Add Good</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/accounts'>Profile</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn logout-btn" onClick={logMeOut}>Logout</NavLink>
                </NavItem>
              </Nav>
              )
              : (
                ''
              )
          }
          {
            authed && localStorage.getItem('userRole') === 'consumer'
              ? (
              <Nav className="ml-auto" navbar>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/home'>Consumer Home</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/basket'>Basket</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn" tag={RRNavLink} to='/accounts'>Profile</NavLink>
                </NavItem>
                <NavItem className="mx-1">
                  <NavLink className="btn nav-btn logout-btn" onClick={logMeOut}>Logout</NavLink>
                </NavItem>
              </Nav>
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
