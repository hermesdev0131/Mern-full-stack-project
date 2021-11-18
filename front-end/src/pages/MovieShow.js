import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ReactPlayer from 'react-player'
import AddARatingLike from '../components/AddARatingLike'
import { deleteMovie } from '../helpers/api'


const MovieShow = ({ isLoggedIn }) => {
  // let numberOfLikes = 0
  // const [likes, setLikes] = useState(0)

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
      console.log('comments', comments)
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

  // const handleLikeButton = () => {
  //   numberOfLikes++
  //   setLikes(numberOfLikes)
  // }

  return (
    <div className="movie-show-div">
      <div className="movie-show-img-div">
        <ReactPlayer className="video"
          url={movie.trailer}
          controls
          width={640}
          height={360}
        />
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
          <p className="not-rated-yet"><img src="https://i.ibb.co/1mxkxtP/burnt-toast-icon.png"/>Rating: {movie.averageRating}</p>
          <div className="comments-container-div">
            <h5>Comments</h5>
            <div className="all-comments">
              {comments.map((comment) => (
                comment.text.length > 0 ? 
                  <div className="single-comment" key={comment._id}>
                    <div className="single-comment-p">
                      <p>{comment.owner.username}: {comment.text}  {comment.timestamps}</p>
                      <p>Likes: {comment.commentLikes.length} </p>
                    </div>
                    <AddARatingLike setComments={setComments} commentId={comment._id} commentLikesArray={comment.commentLikes}/>
                  </div>
                  : false
              ))}
            </div>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            <div id="alter-movie-buttons" className="alter-movie-buttons">
              <Button className="button"><Link className="link" to={`/movies/${id}/edit`}>Edit</Link></Button>
              <Button className="button" onClick={handleDeleteClick}>Delete</Button>
              <Button className="button"><Link className="link" to={`/movies/${id}/rating`}>Rate</Link></Button>
            </div>
          </>
        ) : (
          <>
            <div id="alter-movie-buttons" className="alter-movie-buttons">
              <p>Log in to rate this movie</p>
              <Button id="button"  className="button"><Link className="link" to={'/login'}>Log In</Link></Button>
              <Button id="button" className="button"><Link className="link" to={'/register'}>Sign Up</Link></Button>
            </div>
          </>
        )}
      </div> 
    </div>
  )
}

{/* <div className='like-buttons'>
<Button className="button" onClick={handleLikeButton}>Like</Button>
<p>{likes}</p>
</div> */}

export default MovieShow
