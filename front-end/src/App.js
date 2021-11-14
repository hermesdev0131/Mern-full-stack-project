import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

// import axios from 'axios'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/Nav'
import Home from './pages/Home'
import MovieList from './pages/MovieList'
import MovieShow from './pages/MovieShow'
import MovieAdd from './pages/MovieAdd'
import NotFound from './pages/NotFound'
import MovieEdit from './pages/MovieEdit'
import Footer from './components/Footer'
import { getToken } from './helpers/auth'

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function Movies() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function ShowOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieShow />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function AddOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieAdd />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function EditOneMovie() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <MovieEdit />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function UserLogIn(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Login {...props} setIsLoggedIn={setIsLoggedIn} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function UserRegister() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <Register />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function NotFoundPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main>
        <NotFound />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/movies/new" element={<AddOneMovie />} />
        <Route path="/movies/:id/edit" element={<EditOneMovie />} />
        <Route path="/movies/:id" element={<ShowOneMovie />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/register" element={<UserRegister />} />
        <Route index element={<HomePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App