import React from 'react'

const DisplayOmtions = ({displayOption,setDisplayOption}) => {
  

  const handleDisplayOptionChange = (option) => {
    setDisplayOption(option);
  };

  return (
    <div className='displayBy'>
        Display By:
        <select value={displayOption} 
        onChange={(e) => handleDisplayOptionChange(e.target.value)}>
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="completed">chacked</option>
        </select>
  </div>

  )
}

export default DisplayOmtions