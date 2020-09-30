import { useState } from 'react';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const useSimpleAuth = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  const getCurrentToken = () => sessionStorage.getItem('virtumarket_token');

  const isAuthenticated = () => loggedIn || sessionStorage.getItem('virtumarket_token') !== null;

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
        sessionStorage.setItem('virtumarket_token', res.token);
        sessionStorage.setItem('userRole', res.user_role);
        sessionStorage.setItem('roleId', res.id);
        sessionStorage.setItem('userId', res.uid);
        setIsLoggedIn(true);
        return [isAuthenticated(), res];
      }
      return isAuthenticated();
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
        sessionStorage.setItem('virtumarket_token', res.token);
        sessionStorage.setItem('userRole', res.user_role);
        sessionStorage.setItem('roleId', res.id);
        sessionStorage.setItem('userId', res.uid);
        setIsLoggedIn(true);
        return [isAuthenticated(), res];
      }
      alert('Login credintials not valid!');
      return isAuthenticated();
    })
    .catch((err) => console.error('There was an issue logging this user in:', err));

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    return isAuthenticated();
  };

  return {
    isAuthenticated,
    logout,
    login,
    register,
    getCurrentToken,
  };
};

export default useSimpleAuth;
