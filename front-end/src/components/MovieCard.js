import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

const MovieCard = ({
  _id,
  title, 
  image, 
  averageRating,
  owner,
  User,
  user
}) => {
  console.log(owner.username)
  console.log(User)
  console.log(user)
  return (
    <div>
      <Card style={{ width: '18rem' }} className="movie-card">
        <Card.Img className="card-image" variant="top" src={image} 
          alt={title} style={{ height: '100%', width: '50%' }}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-text">
            {averageRating}
          </Card.Text>
          <Card.Text className="card-user">
            <p>Added by {owner?.username}</p>
          </Card.Text>
          <Button className="button">
            <Link className="link" to={`/movies/${_id}`} >More Info</Link>
          </Button>
          <Button className="button">
            <Link className="link" to={`/movies/${_id}/rating`} >Add a Rating</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MovieCard
