import React from 'react'

import Slide from './Slide'




const Home = () => {
  return (
    <div>
      <h1>Welcome to Burnt Toast</h1>
      <p>The Worlds leading movie review site</p>
      <Slide />
    </div>
  )
}

export default Home

/* {movieDisplay.map((m) => (
  <Carousel key={m._id}>
    <Slide {...m} />
  </Carousel>
))}
  */