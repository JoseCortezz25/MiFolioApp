import axios from 'axios';
const baseURL = 'https://mi-folio-app.herokuapp.com/api';
const baseURL2 = 'http://localhost:5000/api';

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
  return axios.post(`${baseURL2}/update-project/${url}`, projectUpdated);
};

export const getProjectByUrl = async (url) => {
  return await axios.get(`${baseURL}/project/${url}`);
};

export const getProjectById = async (id) => {
  return await axios.get(`${baseURL2}/project-id/${id}`);
};

export const getAllProjects = async () => {
  return await axios.get(`${baseURL}/projects`);
};