import Form from 'react-bootstrap/Form'

import React from 'react'

const RatingForm = () => {
  return (
    <div>
      <Form>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="1"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="3"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="4"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="5"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="6"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="7"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="8"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="9"
              name="group1"
              type={type}
            />
            <Form.Check
              inline
              label="10"
              name="group1"
              type={type}
            />
          </div>
        ))}
      </Form>
    </div>
  )
}

export default RatingForm
