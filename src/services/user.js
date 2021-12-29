import axios from 'axios';
const baseURL = 'https://mi-folio-app.herokuapp.com/api';
// const baseURL2 = 'http://localhost:5000/api';

export const login = (credentials) => {
  return axios.post(`${baseURL}/login`, credentials)
};

export const isVerifyUser = (email) => {
  return axios.post(`${baseURL}/verifyuser`, { email });
};

export const isVerifyUsername = async (username) => {
  // console.log(`${baseURL2}/verify-username/${username}`)
  return axios.post(`${baseURL}/verify-username/${username}`);
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

export const followUser = async (id_sender, id_receiver, isFollowingToUser = false) => {
  return await axios.post(`${baseURL}/follow-user/${id_sender}/${id_receiver}`, isFollowingToUser);
};

export const verifyUserToFollow = async (usernameSender, usernameReceiver) => {
  return await axios.post(`${baseURL}/verify-user-to-follow/${usernameSender}/${usernameReceiver}`);
};

export const getUserFollowing = async (username) => {
  return await axios.get(`${baseURL}/user-following/${username}`);
};
