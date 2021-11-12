import * as React from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../helpers/auth'

const Nav = () => {

  const isUserLoggedIn = () => {
    if (getToken()) {
      return true
    }
    return false
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
          {!isUserLoggedIn() ? (
            <li>
              <Link to="/login">Log In</Link>
            </li>
          ) : (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
