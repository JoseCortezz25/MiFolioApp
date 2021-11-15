import axios from 'axios';
const baseURL = 'https://mi-folio-app.herokuapp.com/api';

export const createNewProject = (project, token) => {
  const config = {     
    headers: { 
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post(`${baseURL}/add-project `, project, config);
};

export const deleteProject = (projectId) => {
  return axios.delete(`${baseURL}/delete-project/${projectId}`);
};

export const updateProject = (url, projectUpdated) => {
  return axios.post(`${baseURL}/update-project/${url}`, projectUpdated);
};
