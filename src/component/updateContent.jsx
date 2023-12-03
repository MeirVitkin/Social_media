import React, { useState } from 'react';

const UpdateContent = ({ todo, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const handleInputChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate({ ...todo, title: updatedTitle });
  };

  return (
    <div>
      <input className='updateTitleInput' type="text" value={updatedTitle} onChange={handleInputChange} />
      <button className='updateTitleSend' onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateContent;