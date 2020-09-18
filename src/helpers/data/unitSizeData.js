import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getUnitSizes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/unitsizes`)
    .then((response) => {
      const unitSizes = response.data;
      resolve(unitSizes);
    })
    .catch((err) => reject(err));
});

export default { getUnitSizes };
