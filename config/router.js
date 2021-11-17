import express from 'express'

//Bringing in our controllers
import { addARatingComment, addARating, addMovie, deleteARating, getAllMovies, getSingleMovie, removeMovie, updateMovie } from '../controllers/movies.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'


//Secure Route
import { secureRoute } from './secureRoute.js'

//Invoking Express router
const router = express.Router()

//Setting up a route
router.route('/movies').get(getAllMovies).post(secureRoute, addMovie)

router.route('/movies/:id').get(getSingleMovie).put(secureRoute, updateMovie).delete(secureRoute, removeMovie) //why is this delete method chained here?

router.route('/movies/:id/rating').post(secureRoute, addARating)

router.route('/movies/:id/rating/:ratingId').delete(secureRoute, deleteARating)

router.route('/movies/:ratingId/comment').post(secureRoute, addARatingComment)

// router.route('/movies/:ratingId/comment/:commentId').delete(secureRoute, deleteARatingComment)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/profile').get(secureRoute, getUserProfile)

//Exporting the router to be used as middleware in index.js
export default router 