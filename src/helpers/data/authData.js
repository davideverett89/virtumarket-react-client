import { useState } from 'react';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const useSimpleAuth = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = () => loggedIn || localStorage.getItem('virtumarket_token') !== null;

  const register = (userInfo) => fetch(`${baseUrl}/register/merchant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((res) => {
      if ('token' in res) {
        localStorage.setItem('virtumarket_token', res.token);
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
      if ('valid' in res && res.valid && 'token' in res) {
        localStorage.setItem('virtumarket_token', res.token);
        setIsLoggedIn(true);
      } else {
        alert('Login credintials not valid!');
      }
    })
    .catch((err) => console.error('There was an issue logging this user in:', err));

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('virtumarket_token');
  };

  return {
    isAuthenticated, logout, login, register,
  };
};

export default useSimpleAuth;
