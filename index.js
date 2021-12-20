import express from 'express'
import mongoose from 'mongoose'
import Movie from './models/movie.js'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'
import path from 'path'


const app = express()
const __dirname = path.resolve() // added for deployment

const startServers = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected successfully')

    //JSON Parser
    app.use(express.static(`${__dirname}/front-end/build`)) // deployment, path which defines where data is served from
    app.use(express.json())

    //Logger
    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} - ${req.url}`)
      next()
    })

    //Router
    app.use('/api', router)
    // catcher middleware
    app.use('/*', (_, res) => res.sendFile(`${__dirname}/front-end/build/index.html`))

    //Catch all
    app.use((_req, res) => {
      res.status(404).json({ message: `Route not found` })
    })

    //Staring our server once our db has successfully connected
    app.listen(port, () => console.log(`Server up and running on port ${port}`))
  } catch (err) {
    console.log(`ERROR: Something has gone wrong`)
    console.log(err)
  }
}
startServers()



