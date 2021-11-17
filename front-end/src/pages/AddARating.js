import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import Form from 'react-bootstrap/Form'
import Fade from 'react-reveal/Fade'

const AddARating = () => {
  const [rating, setRating] = useState({
    
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
      <div className="form-box">
        <h1>Add a Rating</h1>
        <Form onSubmit={handleSubmit} className="form">
          <Fade left>
            <Form.Control
              name='rating'
              type='number'
              value={rating.rating}
              placeholder='How would you rate the movie out of 10?'
              onChange={handleFormChange}
              min="1"
              max="10"
              {...formInputProps} 
            />
          </Fade>
          <Fade right>
            <Form.Control
              name='text'
              type='text'
              value={rating.text}
              placeholder='What did you think of the movie?'
              onChange={handleFormChange}
              {...formInputProps} 
            />
          </Fade>
          <div>
            <Fade left>
              <Form.Control type="submit" value="Add a rating" />
            </Fade>
          </div>
          <div>
            <Fade right>
              <Form.Control type="button" onClick={goBack} value="Cancel" />
            </Fade>
          </div>
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </section>
  )
}

export default AddARating