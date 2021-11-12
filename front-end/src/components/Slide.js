import React from 'react'
// import Carousel from 'react-bootstrap/Carousel'
import { fetchAllMovies } from '../helpers/api'
import { useEffect, useState } from 'react'



const Slide = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    console.log(movies)
    fetchAllMovies().then(setMovies)
  }, [])

  return (
    // <Carousel>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={movies.image}
    //       alt={movies.title}
    //     />
    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={movies.image}
    //       alt={movies.title}
    //     />
    //     <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={movies.image}
    //       alt={movies.title}
    //     />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
    <>
    </>
  )
}

export default Slide
