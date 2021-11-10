import express from 'express'
import { getAllMovies } from '../controllers/movies'

const router = express.Router()

router.route('/movies').get(getAllMovies)