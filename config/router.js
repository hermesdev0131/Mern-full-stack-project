import express from 'express'

//Bringing in our controllers
import { addMovie, getAllMovies, getSingleMovie, removeMovie, updateMovie } from '../controllers/movies.js'
import { loginUser, registerUser } from '../controllers/auth.js'

//Secure Route
import { secureRoute } from './secureRoute.js'

//Invoking Express router
const router = express.Router()

//Setting up a route
router.route('/movies').get(getAllMovies).post(secureRoute, addMovie)

router.route('/movies/:id').get(getSingleMovie).put(secureRoute, updateMovie).delete(secureRoute, removeMovie)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

//Exporting the router to be used as middleware in index.js
export default router 