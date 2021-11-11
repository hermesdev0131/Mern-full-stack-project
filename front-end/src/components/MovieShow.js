import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
import { useParams } from 'react-router-dom'

const MovieShow = () => {
  const [movie, setMovie] = useState([])
  const { id } = useParams()

  useEffect(() => {
    async function fetchMovie() {
  
      const config = {
        method: 'get',
        url: `/api/movies/${id}`,
        headers: { }
      }
  
      const response = await axios(config)
      console.log(response.data)
      setMovie(response.data)
    }
    fetchMovie()
  }, [id])
    
  return (
    <div>
      <h1>
        {movie.title}
      </h1>
      <MovieCard {...movie} />
    </div>
  )
}

export default MovieShow
