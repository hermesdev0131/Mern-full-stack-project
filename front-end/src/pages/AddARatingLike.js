import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import Form from 'react-bootstrap/Form'

const AddARatingLike = () => {
  const [likes, setLikes] = useState('')
  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  const { id } = useParams()
 

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getAxiosRequestConfig(`/movies/${ratingId}/likes`, likes)
    try {
      const response = await axios(config).catch(handleError)
      console.log(response)
      setIsError(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setLikes(value)
  }

  const goBack = () => {
    navigate(-1)
  }

  const formInputProps = { data: rating, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <div className="form-box">
        <h1>Add a Like</h1>
        <Form onSubmit={handleSubmit} className="like-form">
          <div>
            <Form.Control type="submit" value="1" />
          </div>
          <div>
            <Form.Control type="button" onClick={goBack} value="Unlike" />
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

export default AddARatingLike