import axios from 'axios'

console.log(process.env.REACT_APP_BACKEND_URL,'react backend url frontend setup')

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})



export default apiClient