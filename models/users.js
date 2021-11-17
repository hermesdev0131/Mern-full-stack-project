import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, maxlength: 30},
  firstName: {type: String},
  surname: {type: String},
  email: { type: String, unique: true, required: true },
  dateOfBirth: {type: Date},
  favoriteFilm: [{type: String}],
  image: { type: String },
  gender: {type: String},
  password: { type: String, required: true },
})

//Reverse relationship, show the movies user has added
userSchema.virtual('createdMovies', {
  ref: 'Movie', //Model this relates to
  localField: '_id', //Field from user model stored on movie model
  foreignField: 'owner', //Field on the movie that stores the user id
})



//Remove password when returning over as JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){
    delete json.password
    return json
  }
})

//validate

//save

userSchema.virtual('passwordConfirmation').set(function(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation
})
//Custom pre validation
userSchema.pre('validate', function(next){
  if (this.isModified('password') && this.password !== this._passwordConfirmation){
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

//Custom pre save
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