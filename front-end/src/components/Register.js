import * as React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [data, setData] = useState({
    username: '',
    email: '',
    image: '',
    password: '',
    passwordConfirmation: ''
  })

  const [isError, setIsError] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = {
      method: 'post',
      url: 'api/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    }
    try {
      const response = await axios(config)
      console.log(response.data.token)
      setToken(response.data.token)
      // setIsLoggedIn(true)
      setIsError(false)
      navigate('/movies')
    } catch (err){
      console.error(err)
      setIsError(true)
    } 
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value)
  // }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign in to Burnt Toast</h1>
        <div>
          <input placeholder="username" type='text' name='username' value={data.username} onChange={handleFormChange} />
        </div>
        <div>
          <input placeholder="email@email.com" type='email' name = 'email' value={data.email} onChange={handleFormChange} />
        </div>
        <div>
          <input placeholder="image" type='image' name = 'image' value={data.image} onChange={handleFormChange} />
        </div>
        <div>
          <input placeholder="password" type='password' name = 'password' value={data.password} onChange={handleFormChange} />
        </div>
        <div>
          <input placeholder="password confirmation" type='password' name = 'passwordConfirmation' value={data.passwordConfirmation} onChange={handleFormChange} />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
        {isError ? (
          <div className='error'>
            <p>Error. Please try again.</p>
          </div> 
        ) : (
          <></>
        )}
      </form>
    </section>
  )
}

export default Register
