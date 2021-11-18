import axios from 'axios'
import * as React from 'react' 
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getAxiosRequestConfig, deleteLikes } from '../helpers/api'
import { getToken } from '../helpers/auth'

const AddARatingLike = ({
  setComments,
  commentId, 
  commentLikesArray
}) => {

  const { id } = useParams()
  const commentLikes = {
    like: 1
  }
  
  const [ userId, setUserId ] = useState('')
  const [ userLike, setUserLike ] = useState(false)

  ////////////////check whether a user has liked a comment.///////////////////
  useEffect(() => {
    async function getProfile() {
      const config = {
        method: 'get',
        url: '/api/profile',
        headers: { 
          Authorization: `${getToken()}`
        }
      }
      const response = await axios(config)
      setUserId(response.data.id)
      console.log(response.data)
    }
    getProfile()
  }, [])

  useEffect(() => {
    for (let i = 0; i < commentLikesArray.length; i++) {
      const ownerId = toString(commentLikesArray[i].owner)
      if (ownerId === userId){
        setUserLike(true)
      } else {
        setUserLike(false)
      }
    }
  }, [])

  ///////////////////////////////handle the like.///////////////////
  const handleLike = async () => {
    const config = getAxiosRequestConfig(`/movies/${id}/rating/${commentId}/commentLikes`, commentLikes)
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

  ///////////////////////////////handle the dislike.///////////////////
  async function fetchMovie() {
    const config = {
      method: 'get',
      url: `/api/movies/${id}`,
      headers: { }
    }
    const response = await axios(config)
    console.log(response.data.rating)
    setComments(response.data.rating)
    console.log('comments', commentId)
  }

  const handleDislike = async () => {
    const config = deleteLikes(`/movies/${id}/rating/${commentId}/commentLikes`)
    console.log(commentLikes)
    try {
      await axios(config)
      fetchMovie()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      { userLike === true ?
        (<Button onClick={handleDislike} className="button">
          Unlike
        </Button>) :
        (<Button onClick={handleLike} className="button">
          Like
        </Button>)
      }
    </>
  )
}

export default AddARatingLike