import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
// import RatingForm from '../components/RatingForm'
// import Form from 'react-bootstrap/Form'

const AddARating = () => {
  const [rating, setRating] = useState({
    rating: '',
    text: ''
  })
  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  const { id } = useParams()
  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getAxiosRequestConfig(`/movies/${id}/rating`, rating)
    try {
      const response = await axios(config).catch(handleError)
      console.log(response)
      setIsError(false)
      navigate(`/movies/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setRating({
      ...rating,
      [name]: value
    })
  }

  const goBack = () => {
    navigate(-1)
  }

  const formInputProps = { data: rating, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <form className="edit-a-movie-form" onSubmit={handleSubmit}>
        <h1>Add a Rating</h1>
        <input
          name='rating'
          type='number'
          value={rating.rating}
          placeholder='How would you rate the movie out of 10?'
          onChange={handleFormChange}
          min="1"
          max="10"
          {...formInputProps} 
        />
        <input
          name='text'
          type='text'
          value={rating.text}
          placeholder='What did you think of the movie?'
          onChange={handleFormChange}
          {...formInputProps} 
        />
        <div>
          <input type="submit" value="Add a rating" />
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

export default AddARating