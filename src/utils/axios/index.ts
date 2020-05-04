import axios from 'axios'

export const axiosJson = axios.create({
  baseURL: '/api',
  headers: {
    accept: 'application/json'
  }
})
