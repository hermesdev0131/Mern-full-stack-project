import React from 'react'
import { fetchAllMovies } from '../helpers/api'
import { useEffect, useState } from 'react'
import Slide from '../components/Slide'
import Carousel from 'react-bootstrap/Carousel'


const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchAllMovies().then(setMovies)
  }, [])

  return (
    <div className="home">
      <div className="carousel-div">
        <Carousel indicators="false">
          {movies.map((m) => (
            <Carousel.Item key={m._id} className="carousel">
              <Slide {...m} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Home


  