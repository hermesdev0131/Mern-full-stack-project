import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

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
  genre: { type: String },
  cast: [{ type: String }],
  rating: { type: Number, required: true, min: 1, max: 10 }
})

movieSchema.plugin(uniqueValidator)

export default mongoose.model('Movie', movieSchema)
// console.log(Movie)
