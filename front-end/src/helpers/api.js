import axios from 'axios'
// import { getToken } from './auth'


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

// export const deleteMovie = async (id) => {
//   const config = {
//     method: 'delete',
//     url: `${baseUrl}/movies/${id}`,
//     headers: {
//       Authorization: `Bearer ${getToken()}`
//     }
//   }

//   const response = await axios(config)
//   return response.data
// }
