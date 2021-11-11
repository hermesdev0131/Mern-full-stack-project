import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'


const MovieList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchMovies() {

      const config = {
        method: 'get',
        url: '/api/movies',
        headers: { }
      }

      const response = await axios(config)
      console.log(response.data)
      setMovies(response.data)
    }
    fetchMovies()
  }, [])
  
  return (
    <div>
      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            <MovieCard {...m} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
