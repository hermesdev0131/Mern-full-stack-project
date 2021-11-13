import React from 'react'
import { fetchAllMovies } from '../helpers/api'
import { useEffect, useState } from 'react'
import Slide from '../components/Slide'
import Carousel from 'react-bootstrap/Carousel'


const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchAllMovies().then(setMovies)
    console.log(movies)
  }, [])

  return (
    <div className="home">
      <h1>Welcome to Burnt Toast</h1>
      <p>The Worlds leading movie review site</p>
      <Carousel>
        {movies.map((m) => (
          <Carousel.Item key={m._id} className="carousel">
            <Slide {...m} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Home


  