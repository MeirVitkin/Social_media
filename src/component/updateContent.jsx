import React, { useState, useEffect, useRef  } from 'react';

const UpdateContent = ({ todo, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleInputChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate({ ...todo, title: updatedTitle });
  };

  return (
    <div>
      <input className='updateTitleInput'
       type="text"
       value={updatedTitle} 
       onChange={handleInputChange} 
       ref={inputRef}
       />
       
      <button className='updateTitleSend' onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateContent;