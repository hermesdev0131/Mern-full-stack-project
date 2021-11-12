import * as React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'
import MovieShow from './components/MovieShow'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import { Routes, Route, Link } from 'react-router-dom'


function HomePage() {
  return (
    <>
      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <Home />
    </>
  )
}

function Movies() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
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
        <Link to="/login">Log In</Link>
      </nav>
      <main>
        <MovieShow />
      </main>
    </>
  )
}

function UserLogIn() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <main>
        <Login />
      </main>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <main>
        <NotFound />
      </main>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:id" element={<ShowOneMovie />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App