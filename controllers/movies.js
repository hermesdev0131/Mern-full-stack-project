
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

//Get /rating/:id
//Get single rating
// export const getSingleRating = async (req, res) => {
//   try {
//     const { id, ratingId } = req.params
//     const movie = await Movie.findById(id).populate('owner').populate('rating.owner')
//     // console.log(movie)
//     if (!movie) throw new Error()
//     const ratingToLike = movie.rating.id(ratingId)
//     //If rating returns null, throw error
//     if (!ratingToLike) throw new Error()
//     //If owner of comment is not current user, throw error
//     // if (!ratingToLike.owner.equals(req.currentUser._id)) throw new Error()
//     return res.status(200).json(ratingToLike)
//   } catch (err) {
//     console.log(`Comment not found`)
//     console.log(err)
//     return res.status(404).json({ 'message': 'Comment Not Found'})
//   }
// }

//Add a like
export const addARatingLike = async (req, res) => {
  try {
    const { id, ratingId } = req.params
    // console.log('id, rating-id', id, ratingId)
    const movie = await Movie.findById(id).populate('owner').populate('rating.owner')
    const ratingArray = movie.rating
    let ratingSearched = '';
    for(let i = 0; i < ratingArray.length; i++) {
      // console.log('rating from array', i)
      console.log(ratingArray[i].id)
      if(ratingArray[i].id === ratingId){
        ratingSearched = i
        console.log('loop works')
      }
    }
    // console.log('ratingSearched', ratingSearched)
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

// pass current user id 
// loop through commentLikes array
// if ratingArray[i].owner === user id ---> .remove() / .splice [i]

//Delete a rating Like
export const deleteARatingLike = async (req, res) => {
  try {
    const { id, ratingId } = req.params // id = movieId
    //Find movies where rating lives
    const movie = await Movie.findById(id).populate('owner').populate('rating.owner')
    //If no movies found throw error
    if(!movie) throw new Error()
    //find the rating we are looking for
    const ratingArray = movie.rating
    let ratingSearched = ''; // store the rating in this variable
    for(let i = 0; i < ratingArray.length; i++) {
      // console.log('rating from array', i)
      console.log(ratingArray[i].id)
      if(ratingArray[i].id === ratingId){
        ratingSearched = i
        console.log('loop works, ratingSearched =', i)
      }
    }
    // Find the likes we are looking for
    const likesArray = movie.rating[ratingSearched].commentLikes
    // console.log(likesArray) / this works
    let likesToDelete = '';
    for(let i = 0; i < likesArray.length; i++) {
      // convert the id's we want to compare into strings
      const ownerId = toString(likesArray[i].owner) 
      const userId = toString(req.currentUser._id)
      // console.log(ownerId === userId) / quick comparison of the strings
      // if the ownerId and the userId match
      if(ownerId === userId){
        //store the current object in a variable
        likesToDelete = likesArray[i] 
        console.log('loop works, likesToDelete', likesToDelete) // logging the object to make sure its correct
      }
    }
    //If rating returns null, throw error
    if (!likesArray) throw new Error()
    // remove the like at the chosen index from likesArray
    // console.log('likesTodDelete', likesToDelete)
    await likesToDelete.remove() // delete the chosen item from the array
    // save the movie after the like has been removed
    await movie.save({ validateModifiedOnly: true })
    //Return positive response
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Unable to delete rating like'})
  }
}

// const ratingToDelete = movie.rating.commentLikes.id(commentLikesId)

//Delete a rating Like
// export const deleteARatingLike = async (req, res) => {
//   try {
//     const { id, ratingId, commentLikesId } = req.params // id = movieId
//     //Find movies where rating lives
//     const movie = await Movie.findById(id)
//     //If no movies found throw error
//     if(!movie) throw new Error()
//     //Find the ratingLike with the commentLikesId
//     // const likesArray = movie.rating.commentLikes
//     // const likeToDelete = movie.rating.commentLikes.id(commentLikesId)
//     // for(let i = 0; i < likesArray.length; i++) {
//     //   // console.log('rating from array', i)
//     //   console.log(likesArray[i].owner)
//     //   if(likesArray[i].owner === req.currentUser._id){
//     //     likesArray[i].remove()
//     //     console.log('loop works')
//     //   }
//     // }
//     //If rating returns null, throw error
//     if (!likeToDelete) throw new Error()
//     //If owner of comment is not current user, throw error
//     if (!likeToDelete.owner.equals(req.currentUser._id)) throw new Error()
//     //Remove rating
//     await likeToDelete.remove()
//     //Save the movie after rating deleted
//     await movie.save({ validateModifiedOnly: true })
//     //Return positive response
//     return res.sendStatus(204)
//   } catch (err) {
//     console.log(err)
//     return res.status(404).json({ 'message': 'Unable to delete rating like'})
//   }
// }