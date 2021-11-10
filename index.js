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

//Logger middleware
app.use((req, _res, next) => {
  console.log(`Request recieved: ${req.method} - ${req.url}`)
  next()
})

//Routes


//Get /movies

//Catch all middleware
app.use((_req, res) => {
  res.end(`Route not found`)
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



