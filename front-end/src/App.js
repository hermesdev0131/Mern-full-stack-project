import * as React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'
import MovieShow from './components/MovieShow'
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

function ShowOneMovie() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>
      <main>
        <MovieShow />
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
        <Route path="/movies/:id" element={<ShowOneMovie />} />
      </Routes>
    </>
  )
}

export default App