import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'
import { Link } from 'react-router-dom'

const MovieCard = ({ 
  title, 
  image, 
  averageRating
}) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image} alt={title} style={{ width: '100px', height: '180px' }}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {averageRating}
          </Card.Text>
          <Button><Link to="/movies/${_id}">More Info</Link></Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MovieCard
