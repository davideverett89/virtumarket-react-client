import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getGoodTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/goodtypes`)
    .then((response) => {
      const goodTypes = response.data;
      resolve(goodTypes);
    })
    .catch((err) => reject(err));
});

export default { getGoodTypes };
