import dotenv from 'dotenv'
dotenv.config()
export const port = process.env.PORT || 4000
export const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/burnt-toast-db'
export const secret = process.env.SECRET || 'burnt toast'