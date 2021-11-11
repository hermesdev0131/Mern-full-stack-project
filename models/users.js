import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

//username
//email
//password
//image

//password confirmation

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, maxlength: 30},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String }
})


//validate

//save

userSchema.virtual('passwordConfirmation').set(function(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation
})
//Custome pre validation
userSchema.pre('validate', function(next){
  if (this.isModified('password') && this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

//Custome pre save
userSchema.pre('save', function(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)