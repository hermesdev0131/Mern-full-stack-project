import jwt from 'jsonwebtoken'
import { secret } from './environment.js'
import User from '../models/users.js'

export const secureRoute = async (req, res, next) => {
  try {
    //Check the header is present on the request
    if (!req.headers.authorization) throw new Error()

    //If the auth is present remove the unneeded Bearer part from the token
    const token = req.headers.authorization.replace('Bearer ', '')
   
    //Verify the token
    const payload = jwt.verify(token, secret)
    
    //Use the token to query the User model
    const userToVerify = await User.findById(payload.sub)

    //Otherwise unauthorised
    if (!userToVerify) throw new Error('Missing Header')
    
    //Pass user through to controller that will handle request
    req.currentUser = userToVerify

    //Pass the request through to the controller
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised'})
  }
}