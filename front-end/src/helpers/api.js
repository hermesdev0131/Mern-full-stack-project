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

const makeAxiosRequest = async (url, data) => {
  const config = getAxiosRequestConfig(url, data)

  const response = await axios(config)
  return response.data
}

export const login = async (data) => {
  return makeAxiosRequest('/login', data)
}

export const register = (data) => {
  return makeAxiosRequest('/register', data)
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

export const deleteLikes = (requestUrl, data, method = 'delete') => {
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
