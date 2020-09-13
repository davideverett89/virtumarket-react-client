import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getMarkets = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/markets`)
    .then((response) => {
      const markets = response.data;
      resolve(markets);
    })
    .catch((err) => reject(err));
});

export default { getMarkets };
