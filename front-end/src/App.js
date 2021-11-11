import React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'

const App = () => {

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/movies')
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } 
  //   getData()
  // }, [])


  return (
    <div>
      <MovieList />
    </div>
  )
}

export default App