import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 4005
const dbURI = 'mongodb://127.0.0.1:27017/burnt-toast-db'

//Movie schema

const movieSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  director: { type: String },
  releaseYear: { type: Number },
  description: { type: String, required: true, maxlength: 280 },
  genre: { type: String },
  cast: [{ type: String }],
  rating: { type: Number, required: true, min: 1, max: 10 }
})

const Movie = mongoose.model('Movie', movieSchema)
// console.log(Movie)

//JSON Parser
app.use(express.json())

//Logger middleware
app.use((req, _res, next) => {
  console.log(`Request recieved: ${req.method} - ${req.url}`)
  next()
})

//Routes

//Get /movies
app.get('/movies', async (req, res) => {
  const movies = await Movie.find()
  console.log('movies', movies)
  return res.status(200).json(movies)
})

//Post /movies
app.post('/movies', async (req, res) => {
  try {
    console.log(req.body)
    const movieToAdd = await Movie.create(req.body)
    console.log(movieToAdd)
    return res.status(201).json(movieToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})

//Get /movies/:id
app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById()

  } catch (err) {
    
  }
})

//Catch all middleware
app.use((_req, res) => {
  res.status(404).json({ message: `Route not found` })
})

const startServers = async () => {
  try {
    
    await mongoose.connect(dbURI)
    console.log(`Database connected succesfully`)
    app.listen(port, () => console.log(`Server up and running on port ${port}`))
  } catch (err) {
    console.log(`ERROR: Something has gone wrong`)
    console.log(err)
  }
}
startServers()



