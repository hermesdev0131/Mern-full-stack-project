import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//Likes schema
const likeRatingsSchema = new mongoose.Schema(
  {
  text: { type: String, maxlength: 280, required: true },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  },
  {
  timestamps: true
  }
)

//Comment schema -> 
const ratingsSchema = new mongoose.Schema(
  {
  rating: { type: Number, required: true, min: 1, max: 10 },
  text: { type: String, maxlength: 280 },
  owner: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  commentLikes: [likeRatingsSchema]
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
  image: { type: String },
  title: { type: String, unique: true, required: true },
  director: { type: String },
  releaseYear: { type: Number },
  description: { type: String, required: true, maxlength: 280 },
  cast: [{ type: String }],
  genre: [{ type: String }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: [ratingsSchema]
})

movieSchema.virtual('averageRating').get(function(){
  //If there are no ratings, return a string
  if (!this.rating.length) return 'Not Rated Yet'
  const sumOfRatings = this.rating.reduce((acc, rating) => {
    if (!rating.rating) return acc
    return acc + rating.rating
  }, 0)
  console.log('sumOfRatings', sumOfRatings)
  const averageRatingPercentage = ((sumOfRatings / this.rating.length).toFixed(2))*10
  console.log('averageRatingPercentage', averageRatingPercentage)
  return `${averageRatingPercentage}%`
})

movieSchema.set('toJSON', { virtuals: true })

movieSchema.plugin(uniqueValidator)

export default mongoose.model('Movie', movieSchema)
// console.log(Movie)
