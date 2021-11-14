import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import MovieForm from '../components/MovieForm'

const MovieAdd = () => {
  const [data, setData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    description: '',
    genre: [],
    cast: []
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 

  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig('/movies', data)

    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
      setIsError(false)
      navigate(`movies/${response.data._id}`)
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
    <section className="form-section">
      <form onSubmit={handleSubmit}>
        <h1>Add a Movie</h1>
        <MovieForm formInputProps={formInputProps} />
        <div>
          <input type="submit" value="Add Movie" />
        </div>
        {isError ? (
          <div className="error">
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