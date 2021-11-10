import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

const seedDatabase = async () => {
  try {
    //Connect to the db
    await mongoose.connect(dbURI)
    console.log(`Database connected`)
    //Drop the db

    //Seed the db with data file

    //Close our connection to db

    //Close the connection to db
  } catch (err) {
    console.log(err)
  }
}

seedDatabase()
