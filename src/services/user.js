import axios from 'axios';
const baseURL = 'https://mi-folio-app.herokuapp.com/api';
// const baseURL = 'http://localhost:5000/api';

export const login = (credentials) => {
  return axios.post(`${baseURL}/login`, credentials)
};

export const isVerifyUser = (email) => {
  return axios.post(`${baseURL}/verifyuser`, { email });
};

export const register = (credentials) => {
  return axios.post(`${baseURL}/register`, credentials);
};

export const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/user/${id}`);
  return response.data.body;
};

export const getUserByUsername = async (username) => {
  const response = await axios.get(`${baseURL}/user-username/${username}`);
  return response.data.body;
};

export const updateUserById = async (id, data) => {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
  }
  const response = await axios.post(`${baseURL}/user-username/${id}`, data, config);
  return response.data.body;
};