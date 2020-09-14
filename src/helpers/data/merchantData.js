import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const token = localStorage.getItem('virtumarket_token');
const getMerchantById = (merchantId) => axios({
  method: 'GET',
  url: `${baseUrl}/merchants/${merchantId}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  },
});
export default { getMerchantById };
