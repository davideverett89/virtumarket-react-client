import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const token = localStorage.getItem('virtumarket_token');

const getMerchantRelatedToCurrentUser = () => new Promise((resolve, reject) => {
  console.log('Token:', token);
  axios({
    method: 'GET',
    url: `${baseUrl}/merchants/current_user`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      const merchant = response.data;
      resolve(merchant);
    })
    .catch((err) => reject(err));
});

export default { getMerchantRelatedToCurrentUser };
