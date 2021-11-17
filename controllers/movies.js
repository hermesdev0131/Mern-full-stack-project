
import Movie from '../models/movie.js'


//Get /movies
//Returns all movies 
export const getAllMovies = async (_req, res) => {
    const movies = await Movie.find()
    // console.log('movies', movies)
    return res.status(200).json(movies)
  }

//Post /movies
//Adds a movie to the movies collection
export const addMovie = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(owner req.currentUser._id)
    const newMovie = { ...req.body, owner: req.currentUser._id }
    const movieToAdd = await Movie.create(newMovie)
    return res.status(201).json(movieToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

//Get /movies/:id
//Get single movie
export const getSingleMovie = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id).populate('owner').populate('rating.owner')
    // console.log(movie)
    if (!movie) throw new Error()
    return res.status(200).json(movie)
  } catch (err) {
    console.log(`Movie not found`)
    console.log(err)
    return res.status(404).json({ 'message': 'Movie Not Found'})
  }
}

//Put /movies/:id
//Update a specific movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params
    await Movie.findByIdAndUpdate(id, req.body)
    const updatedMovie = await Movie.findById(id)
    return res.status(202).json(updatedMovie)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not Found'})
  }
}

//Delete /movies/:id
//Delete a specific movie from the database
export const removeMovie = async (req, res) => {
  try {
    const { id } = req.params
    const movieToDelete = await Movie.findById(id)
    if (!movieToDelete) throw new Error()
    if (!movieToDelete.owner.equals(req.currentUser._id)) throw new Error()
    await movieToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found'})
  }
}

//Add a rating
export const addARating = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    if (!movie) throw new Error()
    const newRating = { ...req.body, owner: req.currentUser._id }
    console.log('newRating', newRating)
    movie.rating.push(newRating)
    // console.log('Movie ->', movie)
    await movie.save({ validateModifiedOnly: true })
    return res.status(200).json(movie)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Something went wrong'})
  }
}

//Delete a rating
export const deleteARating = async (req, res) => {
  try {
    const { id, ratingId } = req.params
    //Find movies where rating lives
    const movie = await Movie.findById(id)
    //If no movies found throw error
    if(!movie) throw new Error()
    //Find the rating with the ratingId
    const ratingToDelete = movie.rating.id(ratingId)
    //If rating returns null, throw error
    if (!ratingToDelete) throw new Error()
    //If owner of comment is not current user, throw error
    if (!ratingToDelete.owner.equals(req.currentUser._id)) throw new Error()
    //Remove rating
    await ratingToDelete.remove()
    //Save the movie after rating deleted
    await movie.save({ validateModifiedOnly: true })
    //Return positive response
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Something went wrong'})
  }

}

//Add a like
export const addARatingLike = async (req, res) => {
  try {
    const { id, ratingId } = req.params
    console.log('id, rating-id', id, ratingId)
    const movie = await Movie.findById(id)
    const ratingArray = movie.rating
    let ratingSearched;
    for(let i = 0 ; i < ratingArray.length ; i++) {
      console.log('rating from array', i)
      if(ratingArray[i]._id === ratingId){
        ratingSearched = i
      }
    }
    console.log('ratingSearched', ratingSearched)
    // const ratingSearched = movie.rating.findById
    // const ratingSearched = indexOf(ratingId)
    if (!movie) throw new Error()
    const newRatingLike = { ...req.body, owner: req.currentUser._id }
    console.log('newRatingLike', newRatingLike)
    console.log('movie.rating', movie.rating[ratingSearched])
    movie.rating[ratingSearched].commentLikes.push(newRatingLike)
    // console.log('Movie ->', movie)
    await movie.save({ validateModifiedOnly: true })
    return res.status(200).json(movie)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Something went wrong'})
  }
}

//Add a rating Comment
// export const addARatingComment = async (req, res) => {
//   try {
//     const { ratingId } = req.params
//     const comment = await ratingsSchema.findOne(ratingId)
//     if (!comment) throw new Error()
//     const newComment = { ...req.body, owner: req.currentUser._id }
//     console.log('newRating', newComment)
//     comment.rating.push(newComment)
//     // console.log('Movie ->', movie)
//     await comment.save({ validateModifiedOnly: true })
//     return res.status(200).json(comment)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ message: 'Something went wrong'})
//   }
// }

// //Delete a rating Comment
// export const deleteARatingComment = async (req, res) => {
//   try {
//     const { id, ratingId } = req.params
//     //Find movies where rating lives
//     const movie = await Movie.findById(id)
//     //If no movies found throw error
//     if(!movie) throw new Error()
//     //Find the rating with the ratingId
//     const ratingToDelete = movie.rating.id(ratingId)
//     //If rating returns null, throw error
//     if (!ratingToDelete) throw new Error()
//     //If owner of comment is not current user, throw error
//     if (!ratingToDelete.owner.equals(req.currentUser._id)) throw new Error()
//     //Remove rating
//     await ratingToDelete.remove()
//     //Save the movie after rating deleted
//     await movie.save({ validateModifiedOnly: true })
//     //Return positive response
//     return res.sendStatus(204)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ 'message': 'Something went wrong'})
//   }

// }