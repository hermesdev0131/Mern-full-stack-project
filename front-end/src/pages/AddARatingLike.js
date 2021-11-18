import axios from 'axios'
import * as React from 'react' 
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import Form from 'react-bootstrap/Form'


const AddARatingLike = () => {
  const [ like, setLike ] = useState('')
  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  const { id, ratingId } = useParams()
  // const navigate = useNavigate()
 

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = getAxiosRequestConfig(`/movies/${id}/rating/${ratingId}/commentLikes`, like)
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
    setLike(value)
  }

  // const goBack = () => {
  //   navigate(-1)
  // }

  const formInputProps = { data: likes, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <div className="form-box">
        <h1>Add a Like</h1>
        <Form onSubmit={handleSubmit} className="like-form">
          <div>
            <Form.Control 
            type="submit" 
            value="1" 
            onChange={handleFormChange} 
            {...formInputProps}/>
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