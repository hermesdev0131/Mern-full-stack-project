import React from 'react'

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
      <input className="text-field"
        placeholder={placeholder} 
        type={type} 
        name = {name} 
        value={data[name]} 
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
