import { useNavigate } from 'react-router'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const SearchBar = () => {

  const navigate = useNavigate()

  const [info, setInfo] = useState([])
  const [search, setSearch] = useState('')
  const [film, setFilm] = useState('')


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const config = {
          method: 'get',
          url: '/api/movies',
          headers: {}
        }
        const { data } = await axios(config)
        setInfo(data)
        console.log('Info', info)
      } catch (err) {
        console.log(err)
      }
    }
    fetchMovie()
  }, [film])

  const handleSubmit = (event) => {
    event.preventDefault()
    setFilm(search)
    console.log('Search', search)

    const filmObject = info.filter(item => item.title === search)
    console.log('Film Object', filmObject)
    if (filmObject[0]._id === null || undefined) return
    const filmObjectId = (filmObject[0]._id)
    console.log('Film Object Id', filmObjectId)
    navigate(`/movies/${filmObjectId}`)
  }


  const handleChange = (event) => {
    setSearch(event.target.value)
    console.log('Search', search)
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
      <button id="toast" className="button"><Link to={`/movies/${search}`}>Toast</Link></button>
    </form>
  )
}

export default SearchBar