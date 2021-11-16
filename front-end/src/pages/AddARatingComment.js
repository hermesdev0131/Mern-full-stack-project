import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import Form from 'react-bootstrap/Form'

const AddARatingComment = () => {
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
        <h1>Add a Comment</h1>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Control
            name='text'
            type='text'
            value={rating.text}
            placeholder='What did you think of the movie?'
            onChange={handleFormChange}
            {...formInputProps} 
          />
          <div>
            <Form.Control type="submit" value="Add a comment" />
          </div>
          <div>
            <Form.Control type="button" onClick={goBack} value="Cancel" />
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

export default AddARatingComment