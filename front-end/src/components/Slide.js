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
        src={
          image.length <= 5 
            ? 'https://spartacus.s9y.org/cvs/additional_themes/wp/preview_fullsize.jpg' : image }
        alt={title}
      />
      <Carousel.Caption className="slide-caption">
        <h3>{title} - {averageRating}</h3>
      </Carousel.Caption>
    </>
  )
}

export default Slide
