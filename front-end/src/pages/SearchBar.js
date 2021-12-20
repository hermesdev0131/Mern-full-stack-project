import { useNavigate } from 'react-router'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'



const SearchBar = () => {
  const navigate = useNavigate()
  const [info, setInfo] = useState([])
  const [search, setSearch] = useState('')
  const [film, setFilm] = useState('')
  const arrayOfAllFilms = []
  
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
        console.log(info)
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
    if (!arrayOfAllFilms.includes(search)) {
      navigate('/')
    }
    const filmObject = info.filter(item => item.title === search)
    console.log('Film Object', filmObject)
    if (filmObject[0]._id === null || filmObject[0]._id === undefined) {
      return 
    } else {
      const filmObjectId = filmObject[0]._id
      console.log('Film Object Id', filmObjectId)
      navigate(`/movies/${filmObjectId}`)
      setSearch('')
    }
  }


  for (let i = 0; i < info.length; i ++) {
    arrayOfAllFilms.push(info[i].title)
  }

  arrayOfAllFilms.sort()



  const handleChange = (event) => {
    setSearch(event.target.value)
    console.log('Search', search)
  }


  return (
    <form id="category-search" method="GET" onSubmit={handleSubmit}>
      <div className="search-div">
        <input className="search-bar"
          type="search"
          name="category"
          id="category"
          placeholder="Search For a Movie"
          value={search}
          onChange={handleChange}
        />
        <select className="search-bar">
          {arrayOfAllFilms.filter((val) => {
            if (search === '') {
              return val 
            } else if (val.includes(search)) {
              return val
            }
          }).map((val, key) => {
            return (
              <option 
                key={key} 
                className="option" 
                value={val}
                onClick={(event) => {
                  event.preventDefault()
                  setSearch(event.target.value)
                  // for (let i = 0; i < info.length; i++) {
                  //   search === info[i].title ? setSearch(info[i]._id) : 'do nothing'
                  // }
                }}
                
                onSubmit={handleSubmit}
              > 
                {val}
              </option>
            )
          })
          }
        </select>
      </div>
      <button id="toast" onClick={handleSubmit} >Toast</button>
    </form>
  )
}

export default SearchBar