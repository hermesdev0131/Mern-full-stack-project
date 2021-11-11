import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Movie from '../models/movie.js'
import movieData from './data/movies.js'
import userData from './data/users.js'
import User from '../models/users.js'

const seedDatabase = async () => {
  try {
    //Connect to the db
    await mongoose.connect(dbURI)
    console.log(`DB connected`)
    //Drop the db
    await mongoose.connection.db.dropDatabase()
    console.log(`DB Dropped`)

    //Add the user to db
    const users = await User.create(userData)
    // console.log(`Users added to the db`, users)

    //Add owner to each movie
    const moviesWithOwners = movieData.map(movie => {
      movie.owner = users[0]._id
      return movie
    })

    //Seed the db with data file
    const moviesAdded = await Movie.create(moviesWithOwners)
    console.log(`DB has been seed with ${moviesAdded.length} Movies`)
    //Close our connection to db
    await mongoose.connection.close()
    console.log(`Connection to DB closed`)
    
  } catch (err) {
    console.log(err)
    //Close the connection to db
    await mongoose.connection.close()
    console.log(`Error. DB connection closed`)
  }
}

seedDatabase()
