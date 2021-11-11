import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from '@restart/ui/esm/Button'

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
          <Button variant="primary">More Info</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MovieCard
