import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useSimpleAuth from '../../../helpers/data/authData';

import './UserAuthenticationForm.scss';

const UserAuthenticationForm = ({ route }) => {
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
      .then((res) => {
        if (res[0] === true) {
          route(res[1].user_role, res[1].id, res[1].uid);
        }
        return res;
      })
      .catch((err) => console.error('There was an issue logging in:', err));
  };

  return (
        <div className="UserAuthenticationForm">
            <form className="col-6 mx-auto mb-5 jumbotron authentication-form text-left">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input ref={username} type="text" className="form-control" id="username" placeholder="Username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input ref={password} type="password" className="form-control" id="password" placeholder="Password" required/>
                </div>
                <button type="button" className="btn btn-success" onClick={handleLogin}>Login</button>
            </form>
        </div>
  );
};

UserAuthenticationForm.propTypes = {
  route: PropTypes.func.isRequired,
};

export default UserAuthenticationForm;
