import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Movie from '../models/movie.js'
import movieData from './data/movies.js'

const seedDatabase = async () => {
  try {
    //Connect to the db
    await mongoose.connect(dbURI)
    console.log(`DB connected`)
    //Drop the db
    await mongoose.connection.db.dropDatabase()
    console.log(`DB Dropped`)
    //Seed the db with data file
    const moviesAdded = await Movie.create(movieData)
    console.log(`${moviesAdded.length} Movies added`)
    //Close our connection to db
    await mongoose.connection.close()
    console.log(`Bye`)
    
  } catch (err) {
    console.log(err)
    //Close the connection to db
    await mongoose.connection.close()
    console.log(`Error. DB connection closed`)
  }
}

seedDatabase()
