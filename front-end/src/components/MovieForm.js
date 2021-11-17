import React from 'react'
import Form from 'react-bootstrap/Form'
import Fade from 'react-reveal/Fade'


const MovieForm = ({ formInputProps }) => {
  const handleFormChange = formInputProps.handleFormChange



  return (
    <>
      <Fade left>
        <Form.Control
          name='title'
          type='text'
          placeholder='Movie Title'
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='director'
          type='text'
          placeholder='Director'
          onChange={handleFormChange}
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
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='description'
          type='text'
          placeholder='Description'
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
      <Fade left>
        <Form.Control
          name='image'
          type='text'
          placeholder='<Copy Image Url Here>'
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
      <Fade right>
        <Form.Control
          name='genre'
          type='text'
          placeholder='Genre'
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
      <Fade left>
        <Form.Control
          name='cast'
          type='text'
          placeholder='Cast members'
          onChange={handleFormChange}
          {...formInputProps}
        />
      </Fade>
    </>
  )
}

export default MovieForm
