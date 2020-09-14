import { useState } from 'react';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const useSimpleAuth = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = () => loggedIn || localStorage.getItem('virtumarket_token') !== null;

  const register = (userInfo, userRole) => fetch(`${baseUrl}/register/${userRole}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((res) => {
      if ('token' in res && 'user_role' in res) {
        localStorage.setItem('virtumarket_token', res.token);
        localStorage.setItem('userRole', res.user_role);
        setIsLoggedIn(true);
      }
    })
    .catch((err) => console.error('There was an issue with registering this user:', err));

  const login = (credentials) => fetch(`${baseUrl}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((res) => {
      if ('valid' in res && res.valid && 'token' in res && 'user_role' in res) {
        localStorage.setItem('virtumarket_token', res.token);
        localStorage.setItem('userRole', res.user_role);
        setIsLoggedIn(true);
        return isAuthenticated();
      }
      alert('Login credintials not valid!');
      return isAuthenticated();
    })
    .catch((err) => console.error('There was an issue logging this user in:', err));

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('virtumarket_token');
    localStorage.removeItem('userRole');
  };

  return {
    isAuthenticated, logout, login, register,
  };
};

export default useSimpleAuth;
