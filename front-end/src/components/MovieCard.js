import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

const MovieCard = ({
  id,
  title, 
  image, 
  averageRating
}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="movie-card">
        <Card.Img variant="top" src={image} alt={title} style={{ maxWidth: '200px', maxHeight: '280px' }}/>
        <Card.Body classname="card-body">
          <Card.Title classname="card-title">{title}</Card.Title>
          <Card.Text classname="card-text">
            {averageRating}
          </Card.Text>
          <Button classname="card-button">
            <Link to={`/movies/${id}`} className="more-info-link">More Info</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MovieCard
