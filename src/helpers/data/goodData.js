import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const token = localStorage.getItem('virtumarket_token');

const getGoodById = (goodId) => axios({
  method: 'GET',
  url: `${baseUrl}/goods/${goodId}`,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  },
});

const postGood = (newGood) => axios({
  method: 'POST',
  url: `${baseUrl}/goods`,
  headers: {
    Accept: 'application/json',
    Authorization: `Token ${token}`,
  },
  data: newGood,
});

const deleteGood = (goodId) => axios.delete(`${baseUrl}/goods/${goodId}`);

const patchGood = (goodId, updatedName, updatedImage, updatedPrice, updatedQuantity, updatedDescription, updatedUnitSizeId) => axios({
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

export default {
  getGoodById,
  postGood,
  deleteGood,
  patchGood,
};
