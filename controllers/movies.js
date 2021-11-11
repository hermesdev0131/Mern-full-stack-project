import Movie from '../models/movie.js'

//Get /movies
//Returns all movies 
export const getAllMovies = async (_req, res) => {
    const movies = await Movie.find()
    console.log('movies', movies)
    return res.status(200).json(movies)
  }

//Post /movies
//Adds a movie to the movies collection
export const addMovie = async (req, res) => {
  try {
    newMovie = { ...req.body, owner: req.currentUser._id }
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
    const movie = await Movie.findById(id).populate('owner')
    console.log(movie)
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

//Add a comment
export const addARating = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    if (!movie) throw new Error()
    const newRating = { ...req.body, owner: req.currentUser._id }
    console.log('newRating', newRating)
    movie.rating.push(newRating)
    console.log('Movie ->', movie)
    await movie.save()
    return res.status(200).json(movie)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Something went wrong'})
  }
}