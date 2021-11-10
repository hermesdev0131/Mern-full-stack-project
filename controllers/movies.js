import Movie from './models/movie.js'

//Get /movies
export const getAllMovies = async (_req, res) => {
    const movies = await Movie.find()
    console.log('movies', movies)
    return res.status(200).json(movies)
  }
