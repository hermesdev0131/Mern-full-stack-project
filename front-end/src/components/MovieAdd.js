import axios from 'axios'
import * as React from 'react'
import { useState } from 'react'
// import { useNavigate } from 'react-router'
// import { getAxiosRequestConfig } from '../helpers/api'
import FormInput from './FormInput'
import { getToken } from '../helpers/auth'

const MovieAdd = () => {
  const [data, setData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    description: '',
    genre: [''],
    cast: [''],
    image: ''
  }) 

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  // const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // const config = getAxiosRequestConfig('/movies', data)
    const config = {
      method: 'POST',
      url: '/api/movies',
      headers: {
        Authorization: `${getToken}`,
        'Content-Type': 'application/json'
      },
      data: data
    }

    try {
      const response = await axios(config).catch(handleError)
      // const { response } = await axios.post('/api/movies', data).catch(handleError)
      console.log(response)
      
      setIsError(false)
      // navigate(`/movies/${response._id}`)
    } catch (err) {
      console.log(err)
    }
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
          name='title'
          type='text'
          placeholder='Movie Title'
          {...formInputProps}
        />
        <FormInput
          name='director'
          type='text'
          placeholder='Director'
          {...formInputProps}
        />
        <FormInput
          name='releaseYear'
          type='number'
          placeholder='Year of release'
          {...formInputProps}
        />
        <FormInput
          name='description'
          type='text'
          placeholder='Describe the movie in 280 characters...'
          {...formInputProps}
        />
        <FormInput
          name='genre'
          type='text'
          placeholder='Genre'
          {...formInputProps}
        />
        <FormInput
          name='cast'
          type='text'
          placeholder='Cast'
          {...formInputProps}
        />
        <FormInput
          name='image'
          type='text'
          placeholder='<Movie Image Url>'
          {...formInputProps}
        />
        <div>
          <input type='submit' value='Add a Movie' />
        </div>
        {isError ? (
          <div className='error'>
            <p>Error. Please try again</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </section>
  )
}

export default MovieAdd
