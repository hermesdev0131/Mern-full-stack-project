import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 4005
const dbURI = 'mongodb://'

//Logger middleware
app.use((req, _res, next) => {
  console.log(`Request recieved: ${req.method} - ${req.url}`)
  next()
})

//Test Database


//Routes


//Get /movies

//Catch all middleware
app.use((_req, res) => {
  res.end(`Route not found`)
})

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})

