import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


const Slide = ( {
  title, 
  image, 
  averageRating
} ) => {

  return (
    <>
      <>
        <img
          className="d-block w-100"
          src={image}
          alt={title}
        />
        <div className="slide-rating-div"><p><img src="https://i.ibb.co/1mxkxtP/burnt-toast-icon.png"/>{averageRating}</p></div>
      </>
      <Carousel.Caption className="slide-caption">
        <h3>{title}</h3>
      </Carousel.Caption>
    </>
  )
}

export default Slide
