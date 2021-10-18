export const arrayOfSkills = [
  { id: 1, tech: 'Html5' },
  { id: 2, tech: 'Css3' },
  { id: 3, tech: 'Python' },
  { id: 4, tech: 'Java' },
  { id: 5, tech: 'Javascript' },
  { id: 6, tech: 'Jquery' },
  { id: 7, tech: 'Laravel' },
  { id: 8, tech: 'R' },
  { id: 9, tech: 'Apollo' },
  { id: 10, tech: 'Graphql' },
  { id: 11, tech: 'Typescript' },
  { id: 12, tech: 'Mongoose' },
  { id: 13, tech: 'Sequelize' },
  { id: 14, tech: 'SQL' },
  { id: 15, tech: 'MVC' },
  { id: 16, tech: 'WordPress' },
  { id: 17, tech: 'Angular' },
  { id: 18, tech: 'Node' },
  { id: 19, tech: 'Express' },
  { id: 20, tech: 'Php' },
  { id: 21, tech: 'React' },
]

const TOKEN = "token";
const USER = "user";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token)
}

export const setCurrentUser = (user) => {
  localStorage.setItem(USER, user)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const getCurrentUser = () => {
  return localStorage.getItem(USER)
}

export const deleteToken = () => {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
  localStorage.clear()
}

export const validateUser = (idOtherUser, idCurrentUser) => {
  return idOtherUser === idCurrentUser
}