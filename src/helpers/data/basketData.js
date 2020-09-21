import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getBasketByConsumerId = (consumerId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/baskets/${consumerId}/current`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export default { getBasketByConsumerId };
