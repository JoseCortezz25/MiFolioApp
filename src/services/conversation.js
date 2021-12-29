import axios from 'axios';
const baseURL = 'https://mi-folio-app.herokuapp.com/api';
const baseURL2 = 'http://localhost:5000/api';

export const getConversations = async (userId = '') => {
  console.log(` ----> ${baseURL2}/conversations/${userId}`);
  return await axios.get(`${baseURL2}/conversations/${userId}`);
}