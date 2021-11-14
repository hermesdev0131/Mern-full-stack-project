import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


const Slide = ( {
  title, 
  image, 
  averageRating
} ) => {

  return (
    <>
      <img
        className="d-block w-100"
        src={image}
        alt={title}
      />
      <Carousel.Caption>
        <h3>{title}</h3>
        <p>{averageRating}</p>
      </Carousel.Caption>
    </>
  )
}

export default Slide
