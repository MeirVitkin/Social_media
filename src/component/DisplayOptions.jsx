import React from 'react'

const DisplayOmtions = ({displayOption,handleDisplayOptionChange}) => {
  return (
    <div>
        Display By:
        <select value={displayOption} 
        onChange={(e) => handleDisplayOptionChange(e.target.value)}>
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="completed">Completed</option>
        </select>
  </div>

  )
}

export default DisplayOmtions