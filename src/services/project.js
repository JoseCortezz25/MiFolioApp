const create =  async (newObject, token) => {
  await fetch('http://localhost:5000/api/add-project', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: newObject
  }).then(res => res.json())
    .then(data => {
      return data
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
};
