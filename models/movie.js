import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//Comment schema -> 
const ratingsSchema = new mongoose.Schema(
  {
  rating: { type: Number, required: true, min: 1, max: 10 },
  text: { type: String, maxlength: 280 },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  },
  {
  timestamps: true
  }
)

//Cast Schema
const castSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String }
})

//Movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  director: { type: String },
  releaseYear: { type: Number },
  description: { type: String, required: true, maxlength: 280 },
  cast: [{ type: String }],
  genre: [{ type: String }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: [ratingsSchema]
})

movieSchema.plugin(uniqueValidator)

export default mongoose.model('Movie', movieSchema)
// console.log(Movie)
