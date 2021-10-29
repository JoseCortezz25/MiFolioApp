import axios from 'axios';
// const baseURL = 'https://mi-folio-app.herokuapp.com/api';
const baseURL = 'http://localhost:5000/api';

export const createNewProject = (project, token) => {
  const config = {     
    headers: { 
      Authorization: `Bearer ${token}`
    }
  }
  return axios.post(`${baseURL}/add-project `, project, config);
  // await fetch('https://mi-folio-app.herokuapp.com/api/add-project', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: newObject
  // }).then(res => res.json())
  //   .then(data => {
  //     return data
  //   })
};

export const updateProject = (url, projectUpdated) => {
  return axios.post(`${baseURL}/update-project/${url}`, projectUpdated)
};
