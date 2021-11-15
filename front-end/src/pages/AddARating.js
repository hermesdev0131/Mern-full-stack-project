import axios from 'axios'
import * as React from 'react' 
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneMovie, getAxiosRequestConfig } from '../helpers/api'
import MovieForm from '../components/MovieForm'

const AddaRating = () => {
  const [movie, setMovie] = useState({
    rating: '',
    text: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchOneMovie(id).then(setMovie)
  }, [id])

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig(`/movies/${id}`, movie, 'put')

    try {
      const response = await axios(config).catch(handleError)

      console.log(response.data)
      setIsError(false)
      navigate(`/movies/${response.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setMovie({
      ...movie,
      [name]: value
    })
  }

  const goBack = () => {
    navigate(goBack)
  }

  const formInputProps = { data: movie, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <form className="edit-a-movie-form" onSubmit={handleSubmit}>
        <h1>Edit a Movie</h1>
        <MovieForm formInputProps={formInputProps} />
        <div>
          <input type="submit" value="Edit Movie" />
        </div>
        <div>
          <input type="button" onClick={goBack} value="Cancel" />
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

export default MovieEdit