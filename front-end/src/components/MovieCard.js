import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

const MovieCard = ({
  _id,
  title, 
  image, 
  averageRating,
  user
}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="movie-card">
        <Card.Img variant="top" src={image} alt={title} style={{ maxWidth: '200px', maxHeight: '280px' }}/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-text">
            {averageRating}
          </Card.Text>
          <Card.Text className="card-user">
            <p>Added by {user?.username}</p>
          </Card.Text>
          <Button className="card-button">
            <Link to={`/movies/${_id}`} className="more-info-link">More Info</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MovieCard
