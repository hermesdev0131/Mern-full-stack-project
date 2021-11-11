import User from '../models/users.js'

//Post /register
//register a user
export const registerUser = async (req, res) => {
  try {
    const newUser = User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}