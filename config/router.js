import express from 'express'

//Bringing in our controllers
import { addMovie, deleteARating, getAllMovies, getSingleMovie, removeMovie, updateMovie, addARating, addARatingLike, deleteARatingLike } from '../controllers/movies.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'


//Secure Route
import { secureRoute } from './secureRoute.js'

//Invoking Express router
const router = express.Router()

//Setting up a route
router.route('/movies').get(getAllMovies).post(secureRoute, addMovie)

router.route('/movies/:id').get(getSingleMovie).put(secureRoute, updateMovie).delete(secureRoute, removeMovie) 

router.route('/movies/:id/rating').post(secureRoute, addARating)

router.route('/movies/:id/rating/:ratingId').delete(secureRoute, deleteARating)

// router.route('/movies/:id/rating/:ratingId').get(secureRoute, getSingleRating)

router.route('/movies/:id/rating/:ratingId/commentLikes').post(secureRoute, addARatingLike).delete(secureRoute, deleteARatingLike)

// router.route('/movies/:id/rating/:ratingId/commentLikes/:commentLikesId').delete(secureRoute, deleteARatingLike)

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/profile').get(secureRoute, getUserProfile)

//Exporting the router to be used as middleware in index.js
export default router 