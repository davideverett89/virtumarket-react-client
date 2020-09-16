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

const getMarketById = (marketId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/markets/${marketId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export default { getMarkets, getMarketById };
