import React from 'react'

const SearchBy = ({handleSearchPropertyChange,todoSearch,searchOption}) => {
  return (
    <>
        <div>
            Search By:
            <br />
            <label>
              <input
                type="radio"
                value="title"
                checked={searchOption === 'title'}
                onChange={() => handleSearchPropertyChange('title')}
              />
              Title
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="id"
                checked={searchOption === 'id'}
                onChange={() => handleSearchPropertyChange('id')}
              />
              ID
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="completed"
                checked={searchOption === 'completed'}
                onChange={() => handleSearchPropertyChange('completed')}
              />
              Completed
            </label>
          </div>

            <input className='search'
            type="text"
            onChange={(e) => todoSearch(e.target.value)}
            placeholder='search...'
            />
    </>
  )
}

export default SearchBy