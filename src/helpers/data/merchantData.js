import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getMerchantById = (merchantId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/merchants/${merchantId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export default { getMerchantById };
