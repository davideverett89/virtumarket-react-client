import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getGoodById = (goodId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/goods/${goodId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

const postGood = (newGood) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'POST',
    url: `${baseUrl}/goods`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: newGood,
  });
};

const deleteGood = (goodId) => axios.delete(`${baseUrl}/goods/${goodId}`);

const patchGood = (goodId, updatedName, updatedImage, updatedPrice, updatedQuantity, updatedDescription, updatedUnitSizeId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'PATCH',
    url: `${baseUrl}/goods/${goodId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: {
      name: updatedName,
      image: updatedImage,
      price: updatedPrice,
      quantity: updatedQuantity,
      description: updatedDescription,
      unit_size_id: updatedUnitSizeId,
    },
  });
};

const queryGoods = (marketId, searchParams, search) => {
  const token = sessionStorage.getItem('virtumarket_api');
  return axios({
    method: 'GET',
    url: `${baseUrl}/goods/?${searchParams}=${search}?market=${marketId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export default {
  getGoodById,
  postGood,
  deleteGood,
  patchGood,
};
