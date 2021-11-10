import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//username
//email
//password
//image

//password confirmation

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, maxlength: 30},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: Image }
})

//pre validate
//validate
//pre save
//save

userSchema.virtual('passwordConfirmation').set(function(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation
})

userSchema.pre('validate', function(){
  
})

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)