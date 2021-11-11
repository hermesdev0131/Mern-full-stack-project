import React, { useEffect } from 'react'
import axios from 'axios'


const App = () => {

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/movies')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    } 
    getData()
  }, [])


  return (
    <h1> Hello World</h1>
  )
}

export default App