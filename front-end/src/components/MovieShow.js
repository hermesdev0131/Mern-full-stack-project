import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RatingForm from './RatingForm'

const MovieShow = () => {
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
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
      setGenre(response.data.genre)
      setMovie(response.data)
    }
    fetchMovie()
  }, [id])

  return (
    <div>
      <img src={movie.image}/>
      <div>
        <h1>
          {movie.title}
        </h1>
        <div className="movie-info-div">
          <p>Director: {movie.director}</p>
          <p>Released: {movie.releaseYear}</p>
          <p>Description: {movie.description}</p>
          <p>Genre: {genre.join(', ')}</p>
          <p>Rating: {movie.averageRating}</p>
        </div>
        <div className="rate-n-review-div">
          <RatingForm />
        </div>
      </div>
    </div>
  )
}

export default MovieShow
