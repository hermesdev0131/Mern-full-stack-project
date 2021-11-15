import Form from 'react-bootstrap/Form'
import * as React from 'react' 

const RatingForm = () => {

  return (
    <div>
      <>
        <Form.Label>Rate this film</Form.Label>
        <div key='inline-radio' className="mb-3">
          <Form.Check
            inline
            name="rating"
            label="1"
            value="1"
            type={'radio'}
          />
          <Form.Check
            inline
            name="rating"
            label="2"
            value="2"
            type={'radio'}
          />
          <Form.Check
            inline
            name="rating"
            label="3"
            value="3"
            type={'radio'}
          />
          <Form.Check
            inline
            label="4"
            value="4"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="5"
            value="5"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="6"
            value="6"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="7"
            value="7"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="8"
            value="8"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="9"
            value="9"
            name="rating"
            type={'radio'}
          />
          <Form.Check
            inline
            label="10"
            value="10"
            name="rating"
            type={'radio'}
          />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <div>
          <Form.Control id="submit-button" type="submit" value="Add Rating" />
        </div>
        {/* {isError ? (
          <div className="error">
            <p>Error. Please try again</p>
          </div>
        ) : (
          <></>
        )} */}
      </>
    </div>
  )
}

export default RatingForm
