import axios from 'axios'
import * as React from 'react' 
// import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAxiosRequestConfig } from '../helpers/api'
import Button from 'react-bootstrap/Button'

const AddARatingLike = (props) => {
  const commentLikes = {
    like: 1
  }
  // const [errorInfo, setErrorInfo] = useState({})
  // const [isError, setIsError] = useState(false) 
  const { id } = useParams()
  const ratingId = props.comment
  const navigate = useNavigate()
 

  // const handleError = (error) => {
  //   if (error.response) {
  //     setErrorInfo(error.response.data)
  //     setIsError(true)
  //   }
  // }

  const handleClick = async (event) => {
    event.preventDefault()
    const config = getAxiosRequestConfig(`/movies/${id}/rating/${ratingId}/commentLikes`, commentLikes)
    console.log(commentLikes)
    try {
      const response = await axios(config)
      console.log(response)
      // setIsError(false)
    } catch (err) {
      console.log(err)
    }
  }

  // .catch(handleError)

  const goBack = () => {
    navigate(-1)
  }

  // const formInputProps = { errorInfo, handleFormChange }

  return (
    <>
      <Button onClick={handleClick} className="button">
        Like
      </Button>
      <Button onClick={goBack} value="Unlike" className="button">
        Unlike
      </Button>
    </>
  )
}

// {isError ? (
//   <div className="error">
//     <p>Error. Please try again</p>
//   </div>
// ) : (
//   <></>
// )}

export default AddARatingLike