import * as React from 'react'
import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../pages/SearchBar'


const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className='main-header-div'>
      <div className='logo-div'>
        <img src="https://i.ibb.co/1mxkxtP/burnt-toast-icon.png" alt="burnt-toast-icon" className="logo"/>
        <h1>Burnt Toast</h1>
      </div>
      <div className='search-bar-and-nav-div'>
        <div className='search-bar'>
          <SearchBar />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to ="/profile">Profile</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/movies/new">Add A Movie</Link>
                </li>
                <li>
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>    
    </div>
  )
}

export default Nav
