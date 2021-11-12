import * as React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import { getAxiosRequestConfig } from '../helpers/api'

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    image: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errorInfo, setErrorInfo] = useState({})

  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const config = getAxiosRequestConfig('/register', data)

    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data.token)
      setToken(response.data.token)
      setIsError(false)
      navigate('/login')
    } catch (err){
      console.error(err)
      setIsError(true)
    } 
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
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up to Burnt Toast</h1>
        <div>
          <FormInput
            placeholder="username" 
            type='text' 
            name='username' 
            {...formInputProps} 
          />
        </div>
        <FormInput
          placeholder='email@email.com' 
          type='email' 
          name = 'email' 
          {...formInputProps}
        />
        <div>
          <input 
            placeholder="image" 
            type='image' 
            name = 'image' 
            {...formInputProps}
          />
        </div>
        <div>
          <input 
            placeholder="password" 
            type='password' 
            name = 'password' 
            {...formInputProps}
          />
        </div>
        <div>
          <input 
            placeholder="password confirmation" 
            type='password' 
            name = 'passwordConfirmation' 
            {...formInputProps} 
          />
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
