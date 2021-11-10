import express from 'express'

const app = express()
const port = 4005

console.log('UUID', uuid())

app.use((req, _res, next) => {
  console.log(`Request recieved: ${req.method} - ${req.url}`)
  next()
})

app.use((_req, res) => {
  res.end(`Route not found`)
})

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})

