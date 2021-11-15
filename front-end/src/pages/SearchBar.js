import { useNavigate } from 'react-router'
import { useState } from 'react'
import React from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState([])
  const navigate = useNavigate()


// for (let i = 0; i < response.length; i++) {
//   if (search === response[i].title) {
//     setSearch(response[i].id)
//   }
//   return
// }


  const handleSubmit = (event) => {
    event.preventDefault()
    setSearch()
    navigate(`/movies/${search}`)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

   
    
  return (
    <form id="category-search" method="GET" onSubmit={handleSubmit}>
      <input
        type="search"
        name="category"
        id="category"
        placeholder="Search For a Movie"
        value={search}
        onChange={handleChange}
      />
      <input type="submit" value="TOAST" />
    </form>
  )
}

export default SearchBar