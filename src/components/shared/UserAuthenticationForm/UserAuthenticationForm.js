import React, { useRef } from 'react';

import useSimpleAuth from '../../../helpers/data/authData';

import './UserAuthenticationForm.scss';

const UserAuthenticationForm = ({ setAuthed }) => {
  const username = useRef();
  const password = useRef();
  const { login } = useSimpleAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginCredentials = {
      username: username.current.value,
      password: password.current.value,
    };
    login(loginCredentials)
      .then(() => {
        setAuthed(true);
      })
      .catch((err) => console.error('There was an issue logging in:', err));
  };

  return (
        <div className="UserAuthenticationForm">
            <h1>Login</h1>
            <form className="col-6 m-auto">
                <div className="form-group">
                    <label htmlFor="username">Example label</label>
                    <input ref={username} type="text" className="form-control" id="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Another label</label>
                    <input ref={password} type="text" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="button" className="btn btn-success" onClick={handleLogin}>Login</button>
            </form>
        </div>
  );
};

export default UserAuthenticationForm;
