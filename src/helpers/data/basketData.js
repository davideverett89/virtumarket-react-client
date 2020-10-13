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

const completeCustomerBasketById = (basketId, selectedPaymentMethodId, basketTotal) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'PATCH',
    url: `${baseUrl}/baskets/${basketId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: {
      payment_method_id: selectedPaymentMethodId,
      total: basketTotal,
    },
  });
};

const getConsumerBasketHistoryByConsumerId = (consumerId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/baskets?history=${consumerId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export default { getBasketByConsumerId, completeCustomerBasketById, getConsumerBasketHistoryByConsumerId };
