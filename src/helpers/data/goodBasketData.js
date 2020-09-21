import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const postGoodBasket = (newGoodBasket) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'POST',
    url: `${baseUrl}/goodbaskets`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: newGoodBasket,
  });
};

export default { postGoodBasket };
