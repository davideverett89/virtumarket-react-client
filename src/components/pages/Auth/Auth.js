import React, { useState } from 'react';

import UserRegistrationForm from '../../shared/UserRegistrationForm/UserRegistrationForm';
import UserAuthenticationForm from '../../shared/UserAuthenticationForm/UserAuthenticationForm';

import './Auth.scss';

const Auth = ({ setAuthed }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="Auth mt-5">
      <h1 className="display-4">Welcome to VirtuMarket!</h1>
        <div className="bs-example m-5">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={`btn btn-success ${toggle ? 'active' : ''}`}>
                  <input type="radio" name="options" autoComplete="off" onClick={() => setToggle(true)} /> Login
              </label>
              <label className={`btn btn-success ${!toggle ? 'active' : ''}`}>
                  <input type="radio" name="options" autoComplete="off" onClick={() => setToggle(false)} /> Sign Up
              </label>
          </div>
        </div>
        {
            toggle
              ? (<UserAuthenticationForm setAuthed={setAuthed} />)
              : (<UserRegistrationForm setAuthed={setAuthed} />)
        }
    </div>
  );
};

export default Auth;
