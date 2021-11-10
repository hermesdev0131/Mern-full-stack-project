import express from 'express'
import mongoose from 'mongoose'
import Movie from './models/movie.js'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()

const startServers = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log(`Database connected succesfully`)

    //JSON Parser
    app.use(express.json())

    //Logger
    app.use((req, _res, next) => {
      console.log(`Request recieved: ${req.method} - ${req.url}`)
      next()
    })

    //Router
    app.use(router)

    //Catch all
    app.use((_req, res) => {
      res.status(404).json({ message: `Route not found` })
    })

    //Staring our server once our db has succesfully connected
    app.listen(port, () => console.log(`Server up and running on port ${port}`))
  } catch (err) {
    console.log(`ERROR: Something has gone wrong`)
    console.log(err)
  }
}
startServers()



