import express from 'express'

//Bringing in our controllers
import { addMovie, getAllMovies, getSingleMovie, removeMovie, updateMovie } from '../controllers/movies.js'
import { registerUser } from '../controllers/auth.js'

//Invoking Express router
const router = express.Router()

//Setting up a route
router.route('/movies').get(getAllMovies).post(addMovie)

router.route('/movies/:id').get(getSingleMovie).put(updateMovie).delete(removeMovie)

router.route('/register').post(registerUser)

//Exporting the router to be used as middleware in index.js
export default router 