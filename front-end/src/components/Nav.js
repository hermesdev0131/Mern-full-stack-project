import * as React from 'react'
import { Link } from 'react-router-dom'
import { removeToken } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'


const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
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
  )
}

export default Nav
