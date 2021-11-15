import * as React from 'react'
// import axios from 'axios'
import { useState } from 'react'
// import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import Form from 'react-bootstrap/Form'
import { FloatingLabel } from 'react-bootstrap'
import { register } from '../helpers/api'
// import { getAxiosRequestConfig } from '../helpers/api'

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

    register(data).then(handleSuccessfulRegister).catch(handleError)

  }

  const handleSuccessfulRegister = () => {
    setIsError(false)
    navigate('/login')
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
    console.log(data)
  }

  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <section className="form-section">
      <Form className="registration-form" onSubmit={handleSubmit}>
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
          name='email' 
          {...formInputProps}
        />
        <div>
          <FloatingLabel controlId="floatingSelect" label="Choose your Avatar"> 
            <Form.Select name="image" type="image" aria-label="Floating label select example" {...formInputProps} onChange={handleFormChange} >
              <option>Open this select menu</option>
              <option value='https://image.emojipng.com/393/209393.jpg'>😉</option>
              <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/grinning-face.png">😀</option>
              <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/face-with-tears-of-joy.png">😂</option>
              <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/nerd-face.png">🤓</option>
            </Form.Select>
          </FloatingLabel>
        </div>
        <div>
          <FormInput
            placeholder="password" 
            type='password' 
            name = 'password' 
            {...formInputProps}
          />
        </div>
        <div>
          <FormInput
            placeholder="password confirmation" 
            type='password' 
            name = 'passwordConfirmation' 
            {...formInputProps} 
          />
        </div>
        <div>
          <Form.Control type="submit" value="Register" />
        </div>
        {isError ? (
          <div className='error'>
            <p>Error. Please try again.</p>
          </div> 
        ) : (
          <></>
        )}
      </Form>
    </section>
  )
}

export default Register
