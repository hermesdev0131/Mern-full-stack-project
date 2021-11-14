import axios from 'axios'
import { getToken } from './auth'

// const baseUrl = '/api'

export const fetchAllMovies = async () => {
  const config = {
    method: 'get',
    url: '/api/movies',
    headers: {}
  }
  const response = await axios(config)
  return response.data
}

export const fetchOneMovie = async (id) => {
  const config = {
    method: 'get',
    url: `/api/movies/${id}`,
    headers: {}
  }
  const response = await axios(config)
  return response.data
}

export const deleteMovie = async (id) => {
  const config = {
    method: 'delete',
    url: `/api/movies/${id}`,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
  const response = await axios(config)
  return response.data
}

export const getAxiosRequestConfig = (requestUrl, data, method = 'post') => {
  const config = {
    method,
    url: `/api${requestUrl}`,
    headers: { 
      Authorization: `${getToken()}`,
      'Content-Type': 'application/json'
    },
    data
  }
  return config
}

