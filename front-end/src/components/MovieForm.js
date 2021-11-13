import FormInput from './FormInput'

import React from 'react'

const MovieForm = ({ formInputProps }) => {
  return (
    <>
      <FormInput
        name='title'
        type='text'
        placeholder='Movie Title'
        {...formInputProps}
      />
      <FormInput
        name='director'
        type='text'
        placeholder='Director'
        {...formInputProps}
      />
      <FormInput
        name='realse year'
        type='number'
        placeholder='Year of release'
        {...formInputProps}
      />
      <FormInput
        name='description'
        type='text'
        placeholder='Description'
        {...formInputProps}
      />
      <FormInput
        name='genre'
        type='text'
        placeholder='Genre'
        {...formInputProps}
      />
      <FormInput
        name='cast'
        type='text'
        placeholder='Cast members'
        {...formInputProps}
      />
    </>
  )
}

export default MovieForm
