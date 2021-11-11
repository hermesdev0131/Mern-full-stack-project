import * as React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'
import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Welcome to Burnt Toast</h1>
      <nav>
        <Link to="/movies">Movies</Link>
      </nav>
    </>
  )
}

function Movies() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <main>
        <MovieList />
      </main>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}/>
      </Routes>
    </>
  )
}

export default App