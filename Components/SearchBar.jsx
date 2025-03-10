import React from 'react'

export const SearchBar = ({setQuery}) => {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
        type="text"
        placeholder="Search for a Country"
      />
    </div>
  )
}

export default SearchBar
