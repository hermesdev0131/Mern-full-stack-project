import axios from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { getAxiosRequestConfig } from '../helpers/api'
import FormInput from './FormInput'

const MovieAdd = () => {
  const [data, setData] = useState({
    title: 'Marvels: Infinity War',
    director: 'Russo Brothers',
    releaseYear: 2020,
    description: 'Avengers Assemble',
    genre: ['Sci-Fi'],
    cast: ['Robert Downey Junior', 'Benedict Cumberbatch', 'Tom Holland']
  })

  const [errorInfo, setErrorInfo] = useState({})

  const [isError, setIsError] = useState(false)

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig('/login', data)

    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
    } catch (err) {}
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Add a Movie</h1>
        <FormInput
          name='name'
          type='text'
          placeholder='Movie Title'
          {...formInputProps}
        />
      </form>
    </section>
  )
}

export default MovieAdd
