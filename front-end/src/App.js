import * as React from 'react'
// import axios from 'axios'
import MovieList from './components/MovieList'
import MovieShow from './components/MovieShow'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Home />
      </main>
    </>
  )
}

function Movies() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <MovieList />
      </main>
    </>
  )
}

function ShowOneMovie() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <MovieShow />
      </main>
    </>
  )
}

function UserLogIn() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Login />
      </main>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <header>
        <Nav />
      </header>
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