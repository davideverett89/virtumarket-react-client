import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const token = sessionStorage.getItem('virtumarket_token');

const getUserById = (userId) => axios({
  method: 'GET',
  url: `${baseUrl}/users/${userId}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  },
});

export default { getUserById };
