import * as React from 'react'
// import axios from 'axios'
import { useState } from 'react'
// import { setToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import Form from 'react-bootstrap/Form'
import { register } from '../helpers/api'
import Fade from 'react-reveal/Fade'

const Register = () => {
  const [data, setData] = useState({
    surname: '',
    email: '', 
    dateOfBirth: '',
    favoriteFilm: '',
    gender: '',
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
      <div className="form-box">
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit} className="form">
          <div>
            <Fade left>
              <FormInput
                placeholder="username" 
                type='text' 
                name='username' 
                {...formInputProps} 
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='email@email.com' 
                type='email' 
                name='email' 
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade left>
              <FormInput
                placeholder="Date of Birth" 
                type='date' 
                name='dateOfBirth' 
                {...formInputProps} 
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <Form.Select 
                name="gender" type="text" 
                aria-label="Floating label select example" 
                {...formInputProps} onChange={handleFormChange}
                className="form-select" >
                <option>Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </Form.Select>
            </Fade>
          </div>
          <div>
            <Fade left>
              <Form.Select 
                name="image" type="image" 
                aria-label="Floating label select example" 
                {...formInputProps} onChange={handleFormChange}
                className="form-select" >
                <option>Choose your avatar</option>
                <option value='https://image.emojipng.com/393/209393.jpg'>😉</option>
                <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/grinning-face.png">😀</option>
                <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/face-with-tears-of-joy.png">😂</option>
                <option value="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/nerd-face.png">🤓</option>
              </Form.Select>
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder="Tell us your favorite film(s)" 
                type='type' 
                name='favoriteFilm' 
                {...formInputProps} 
              />
            </Fade>
          </div>
          <div>
            <Fade left>
              <FormInput
                placeholder="password" 
                type='password' 
                name = 'password' 
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder="password confirmation" 
                type='password' 
                name = 'passwordConfirmation' 
                {...formInputProps} 
              />
            </Fade>
          </div>
          <div>
            <Fade left>
              <Form.Control type="submit" value="Register" />
            </Fade>
          </div>
          {isError ? (
            <div className='error'>
              <p>Error. Please try again.</p>
            </div> 
          ) : (
            <></>
          )}
        </Form>
      </div>  
    </section>
  )
}

export default Register
