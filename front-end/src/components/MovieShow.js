import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

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
          <Form>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="1"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="3"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="4"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="5"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="6"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="7"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="8"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="9"
                  name="group1"
                  type={type}
                />
                <Form.Check
                  inline
                  label="10"
                  name="group1"
                  type={type}
                />
              </div>
            ))}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MovieShow
