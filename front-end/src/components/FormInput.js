import React from 'react'
import Form from 'react-bootstrap/Form'

const FormInput = ({ 
  name, 
  data, 
  errorInfo, 
  type, 
  placeholder, 
  handleFormChange 
}) => {
  return (
    <div>
      <Form.Control
        className="text-field"
        placeholder={placeholder} 
        type={type} 
        name = {name} 
        value={data[name]} 
        min="1901"
        max="2050"
        onChange={handleFormChange} 
      />
      {errorInfo.errors?.[name] ? (
        <p className='error'>{errorInfo.errors[name]}</p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FormInput
