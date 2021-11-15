import { useNavigate } from 'react-router'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [objectSearch, setObjectSearch] = useState('')
  const [browser, setBrowser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMovie() {
  
      const config = {
        method: 'get',
        url: '/api/movies',
        headers: { }
      }
      const response = await axios(config)
      setObjectSearch(response.data)  
    }
    fetchMovie()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    for (let i = 0; i < objectSearch.length; i++) {
      search === objectSearch[i].title ? setBrowser(objectSearch[i]._id) : 'do nothing'
    }
    navigate(`/movies/${browser}`)
  }


  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  
  return (
    <form id="category-search" method="GET" onSubmit={handleSubmit}>
      <input className="search-bar"
        type="search"
        name="category"
        id="category"
        placeholder="Search For a Movie"
        value={search}
        onChange={handleChange}
      />
      <input id="toast" className="button" type="submit" value="TOAST" />
    </form>
  )
}

export default SearchBar