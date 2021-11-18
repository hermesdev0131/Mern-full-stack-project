import axios from 'axios'
import * as React from 'react' 
import { useParams } from 'react-router-dom'
import { getAxiosRequestConfig, deleteLikes } from '../helpers/api'
import Button from 'react-bootstrap/Button'

const AddARatingLike = ({
  comment, 
  setComments
}) => {

  const { id } = useParams()
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

  async function fetchMovie() {
    const config = {
      method: 'get',
      url: `/api/movies/${id}`,
      headers: { }
    }
    const response = await axios(config)
    console.log(response.data.rating)
    setComments(response.data.rating)
    console.log('comments', comment)
  }

  const handleDislike = async () => {
    const config = deleteLikes(`/movies/${id}/rating/${comment}/commentLikes`)
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
      <Button onClick={handleLike} className="button">
        Like
      </Button>
      <Button onClick={handleDislike} className="button">
        Unlike
      </Button>
    </>
  )
}

export default AddARatingLike

const [ userId, setUserId ] = useState('')

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
    setUserData(response.data.id)
    console.log(response.data)
  }
  getProfile()
}, [])

// const likesArray = comment.commentLikes
// for(let i = 0; i < likesArray.length; i++) {
//   const ownerId = toString(likesArray[i].owner) 
//   const userId = toString(currentUser._id)
//   if(ownerId === userId){
//   <Button onClick={handleDislike} className="button">
//   Unlike
//   </Button>
//   } else {
//   <Button onClick={handleLike} className="button">
//   Like
//   </Button>
//   }
// }