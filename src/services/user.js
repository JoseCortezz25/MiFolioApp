import axios from 'axios';
import { setToken, setCurrentUser } from '../utils/helpers';
const baseURL = 'http://localhost:5000/api';

export const login = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials);
  setToken(response.data.body.token);
  setCurrentUser(response.data.body.id);
  return response.data.body;
};

export const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/user/${id}`);
  return response.data.body;
};

export const getUserByUsername = async (username) => {
  console.log(`${baseURL}/user-username/${username}`);
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