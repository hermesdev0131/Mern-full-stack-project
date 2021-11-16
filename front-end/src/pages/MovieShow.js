import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deleteMovie } from '../helpers/api'
import Button from 'react-bootstrap/Button'

const MovieShow = () => {
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [comments, setComments] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchMovie() {
  
      const config = {
        method: 'get',
        url: `/api/movies/${id}`,
        headers: { }
      }
      const response = await axios(config)
      console.log(response.data.rating)
      setGenre(response.data.genre)
      setComments(response.data.rating)
      setMovie(response.data)
    }
    fetchMovie()
  }, [id])

  const handleDeleteClick = () => {
    deleteMovie(id)
      .then((data) => {
        console.log(data)
        navigate('/movies')
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  return (
    <div className="movie-show-div">
      <div className="movie-show-img-div">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-data-container-div">
        <div className="movie-info">
          <h1>
            {movie.title}
          </h1>
          <p>Director: {movie.director}</p>
          <p>Released: {movie.releaseYear}</p>
          <p>Description: {movie.description}</p>
          <p>Genre: {genre.join(', ')}</p>
          <p>Rating: {movie.averageRating}</p>
          <div className="comments-div">
            <h5>Comments</h5>
            <ul>
              {comments.map((comment) => (
                comment.text.length > 0 ? 
                  <li key={comment._id}>
                    {comment.owner.username}: {comment.text}  {comment.timestamps} 
                  </li>
                  : false
              ))}
            </ul>
          </div>
        </div>
        <div className="alter-movie-buttons">
          <Button className="button"><Link className="link" to={`/movies/${id}/edit`}>Edit Movie</Link></Button>
          <Button className="button" onClick={handleDeleteClick}>Delete movie</Button>
          <Button className="button"><Link className="link" to={`/movies/${id}/rating`}>Rate movie</Link></Button>
        </div>
      </div>
      
    </div>
  )
}

export default MovieShow
