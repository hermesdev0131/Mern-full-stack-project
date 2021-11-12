import Form from 'react-bootstrap/Form'

import React from 'react'

const RatingForm = () => {
  return (
    <div>
      <Form>
        <Form.Label>Rate this film</Form.Label>
        <div key='inline-radio' className="mb-3">
          <Form.Check
            inline
            label="1"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="3"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="4"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="5"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="6"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="7"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="8"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="9"
            name="group1"
            type={'radio'}
          />
          <Form.Check
            inline
            label="10"
            name="group1"
            type={'radio'}
          />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </div>
  )
}

export default RatingForm
