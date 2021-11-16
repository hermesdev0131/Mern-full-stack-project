import React from 'react'
import Form from 'react-bootstrap/Form'
import Fade from 'react-reveal/Fade'

const MovieForm = ({ formInputProps }) => {
  return (
    <>
      <Fade left>
        <Form.Control
          name='title'
          type='text'
          placeholder='Movie Title'
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='director'
          type='text'
          placeholder='Director'
          {...formInputProps}
        />
      </Fade>
      <Fade left>
        <Form.Control
          name='releaseYear'
          type='number'
          placeholder='Year of release'
          min="1901"
          max="2050"
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='description'
          type='text'
          placeholder='Description'
          {...formInputProps}
        />
      </Fade>
      <Fade left>
        <Form.Control
          name='image'
          type='text'
          placeholder='<Copy Image Url Here>'
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='genre'
          type='text'
          placeholder='Genre'
          {...formInputProps}
        />
      </Fade>
      <Fade left>
        <Form.Control
          name='cast'
          type='text'
          placeholder='Cast members'
          {...formInputProps}
        />
      </Fade>
    </>
  )
}

export default MovieForm
