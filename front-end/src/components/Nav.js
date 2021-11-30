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
      <div className='search-bar-div'>
        <SearchBar />
      </div>
      <div className='nav-div'>
        <nav>
          <ul>
            <li>
              <Link className='nav-link' to="/">Home</Link>
            </li>
            <li>
              <Link className='nav-link' to="/movies">Movies</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/movies/new" className='nav-link' >Add Movie</Link>
                </li>
                <li>
                  <Link className='nav-link' to ="/profile">Profile</Link>
                </li>
                <li>
                  <span className='nav-link' onClick={handleLogout}>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className='nav-link' to="/login">Log In</Link>
                </li>
                <li>
                  <Link className='nav-link' to="/register">Sign Up</Link>
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
