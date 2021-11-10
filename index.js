import express from 'express'

const app = express()

const port = 4005

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})

