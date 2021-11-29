import React, { useState } from 'react'
import './TodoSearch.css'

function TodoSearch() {
  const [searchValue, setSearchValue] = useState('')

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  return [
    <input
      className='TodoSearch'
      placeholder='Cebolla'
      value={searchValue}
      onChange={onSearchValueChange}
    />,
    <p>{searchValue}</p>,
  ]
}

export { TodoSearch }
