import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.virtumarketAPI.apiUrl;

const getUserById = (userId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/users/${userId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

const getSimpleUserRoleById = (userId) => {
  const token = sessionStorage.getItem('virtumarket_token');
  return axios({
    method: 'GET',
    url: `${baseUrl}/accounts/edit/${userId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

const patchUser = (userId, updatedUser) => {
  const token = sessionStorage.getItem('virtumarket_token');
  const {
    username,
    bio,
    email,
    firstName,
    lastName,
    profileImage,
    phoneNumber,
    marketId,
    companyName,
    boothImage,
  } = updatedUser;

  return axios({
    method: 'PATCH',
    url: `${baseUrl}/users/${userId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
    data: {
      username,
      bio,
      email,
      first_name: firstName,
      last_name: lastName,
      profile_image: profileImage,
      phone_number: phoneNumber,
      market_id: marketId,
      company_name: companyName,
      booth_image: boothImage,
    },
  });
};

export default { getUserById, getSimpleUserRoleById, patchUser };
