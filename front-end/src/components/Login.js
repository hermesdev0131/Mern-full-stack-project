import * as React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      username,
      password
    }  
    const config = {
      method: 'post',
      url: 'api/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    }
    try {
      const response = await axios(config)
      console.log(response.data.token)
      setToken(response.data.token)
      setIsLoggedIn(true)
      setIsError(false)
      navigate('/movies')
    } catch (err){
      console.error(err)
      setIsError(true)
    } 
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign in to Burnt Toast</h1>
        <div>
          <input placeholder="username" type='text' value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <input placeholder="password" type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <input type="submit" value="Login" />
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

export default Login
