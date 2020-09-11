import React from 'react';

import useSimepleAuth from '../../../helpers/data/authData';

import './MyNavBar.scss';

const MyNavBar = ({ setAuthed }) => {
  const { logout } = useSimepleAuth();
  const logMeOut = (e) => {
    e.preventDefault();
    logout();
    setAuthed(false);
  };
  return (
        <div className="MyNavbar">
            <h1>Navbar</h1>
            <button className="btn btn-dark logout-btn" onClick={logMeOut}>Logout</button>
        </div>
  );
};

export default MyNavBar;
