import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const token = localStorage.getItem('virtumarket_token');

const getGoodById = (goodId) => axios({
  method: 'GET',
  url: `${baseUrl}/goods/${goodId}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  },
});

export default { getGoodById };
