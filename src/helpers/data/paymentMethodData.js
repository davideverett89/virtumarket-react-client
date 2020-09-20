import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const postPaymentMethod = (newPaymentMethod) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'POST',
    url: `${baseUrl}/paymentmethods`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: newPaymentMethod,
  });
};

export default { postPaymentMethod };
