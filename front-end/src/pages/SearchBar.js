// import { useNavigate } from 'react-router'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Button from 'react/bootstrap/Button' 

const SearchBar = () => {
  // const [search, setSearch] = useState('')
  // const [objectSearch, setObjectSearch] = useState('')
  // const [browser, setBrowser] = useState('')
  // const navigate = useNavigate()
  let search = ''
  let testData = ''
  const [searchX, setSearchX] = useState('')

  useEffect(() => {
    async function fetchMovie() {
      

      const config = {
        method: 'get',
        url: '/api/movies',
        headers: { }
      }
      const response = await axios(config)
      // setObjectSearch(response.data)  
      testData = response.data
      console.log('Test Data', testData)
    }
    fetchMovie()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    for (let i = 0; i < testData.length; i++) {
      // search === objectSearch[i].title ? setBrowser(objectSearch[i]._id) : 'do nothing'
      // console.log('Browser', browser)
      // console.log('SEARCH', search)
      search = searchX === testData[i].title ? testData[i]._id : 'do nothing'
    }
    console.log('String Search', search)
    // navigate(`/movies/${browser}`)
  }

  const handleChange = (event) => {
    setSearchX(event.target.value)
  }


  
  return (
    <form id="category-search" method="GET" onSubmit={handleSubmit}>
      <input className="search-bar"
        type="search"
        name="category"
        id="category"
        placeholder="Search For a Movie"
        value={searchX}
        onChange={handleChange}
          
      />
      {/* <input id="toast" className="button" type="submit" value="TOAST" /> */}
      <button id="toast" className="button"><Link to={`/movies/${search}`}>Toast</Link></button>
    </form>
  )
}

export default SearchBar