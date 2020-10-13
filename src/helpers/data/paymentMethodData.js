import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getPaymentMethodsByConsumerId = (consumerId) => new Promise((resolve, reject) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/paymentmethods?consumer_id=${consumerId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      const paymentMethods = response.data;
      resolve(paymentMethods);
    })
    .catch((err) => reject(err));
});

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

const deletePaymentMethod = (paymentMethodId) => axios.delete(`${baseUrl}/paymentmethods/${paymentMethodId}`);

export default { postPaymentMethod, deletePaymentMethod, getPaymentMethodsByConsumerId };
