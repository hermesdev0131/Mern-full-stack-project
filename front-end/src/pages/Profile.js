import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import MovieCard from '../components/MovieCard'
import { getToken } from '../helpers/auth'


const Profile = () => {
  const [ moviesAdded, setMoviesAdded ] = useState([])
  const [ userData, setUserData ] = useState({
    username: '',
    email: '',
    image: ''
  })


  useEffect(() => {
    async function getProfile() {

      const config = {
        method: 'get',
        url: '/api/profile',
        headers: { 
          Authorization: `${getToken()}`
        }
      }

      const response = await axios(config)
      setMoviesAdded(response.data.createdMovies)
      setUserData(response.data)
      console.log(response.data)
    }
    getProfile()
  }, [])

  return (
    <div className="profile-container">
      <div className="personal-details">
        <Card className="profile-card">
          <Card.Img className="card-image" variant="top" src={`${userData.image}`} style={{ minWidth: '200px' }}/>
          <Card.Body className="card-body">
            <Card.Title className='card-title'>
              <p className="username">{userData.username}</p>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="created-movies-div">
        <p className="movies-add-by">Your Movies</p>
        <ul id="profile-movie-list" className="movie-list">
          {moviesAdded.map((m) => (
            <li key={m._id}>
              <MovieCard {...m} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile
