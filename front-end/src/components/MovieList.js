import React from 'react'
import { useState, useEffect } from 'react'
// import axios from 'axios'
import MovieCard from './MovieCard'
import { fetchAllMovies } from '../helpers/api'

const MovieList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchAllMovies().then(setMovies)
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
