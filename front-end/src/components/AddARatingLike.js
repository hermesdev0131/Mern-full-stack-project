import axios from 'axios'
import * as React from 'react' 
// import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { useEffect } from 'react'
import { getAxiosRequestConfig } from '../helpers/api'
import Button from 'react-bootstrap/Button'

const AddARatingLike = ({
  comment, 
  setComments
}) => {

  const { id } = useParams()
  const navigate = useNavigate()
  const commentLikes = {
    like: 1
  }
 
  const handleLike = async () => {
    const config = getAxiosRequestConfig(`/movies/${id}/rating/${comment}/commentLikes`, commentLikes)
    console.log(commentLikes)
    try {
      const { data } = await axios(config)
      console.log(data.rating)
      setComments(data.rating)
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
      <Button onClick={handleLike} value="button" className="button">
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