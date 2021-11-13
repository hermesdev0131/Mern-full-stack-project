import React from 'react'
import { useState, useEffect } from 'react'
// import axios from 'axios'
import MovieCard from '../components/MovieCard'
import { fetchAllMovies } from '../helpers/api'

const MovieList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchAllMovies().then(setMovies)
  }, [])
    
  return (
    <div className="movie-list-div">
      <ul className="movie-list">
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
