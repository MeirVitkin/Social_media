import React, { useState } from 'react';


const SearchBy = ({API_URL,id,setTodos}) => {
  const [searchOption, setSearchOption] = useState('title');

  const handleSearchPropertyChange = (property) => {
    setSearchOption(property);
  };

  const todoSearch = async (value) => {
    let response = await fetch(`${API_URL}?userId=${id}`);
    let data = await response.json();
    let filteredData;

    switch (searchOption) {
      case 'id':
        filteredData = data.filter((item) => item.id.toString().includes(value));
        break;
      case 'completed':
        filteredData = data.filter((item) => !item.checked && item.title.toLowerCase().includes(value.toLowerCase())); break;
      default:
        filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        break;
    }
    setTodos(filteredData);
  };
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