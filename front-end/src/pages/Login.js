import * as React from 'react'
// import axios from 'axios'
import { useState } from 'react'
import { setToken } from '../helpers/auth'
import { login } from '../helpers/api'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import Form from 'react-bootstrap/Form'
// import { getAxiosRequestConfig } from '../helpers/api'

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSuccessfulLogin = ({ token }) => {
    setToken(token)
    setIsLoggedIn(true)
    setIsError(false)
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    login(data).then(handleSuccessfulLogin).catch(handleError)

  }

  
  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
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
  
  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <div className="form-box">
        <h1>Log in</h1>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FormInput 
              placeholder="username" 
              type='text'
              name='username' 
              {...formInputProps} 
            />
            <FormInput 
              placeholder="password" 
              type='password'
              name='password' 
              {...formInputProps} 
            />
            <div>
              <Form.Control type="submit" value="Login" />
            </div>
            {isError ? (
              <div className='error'>
                <p>Error. Please try again.</p>
              </div> 
            ) : (
              <></>
            )}
          </Form.Group>
        </Form>
      </div>
    </section>
  )
}

export default Login
