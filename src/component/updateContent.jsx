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




// import React from 'react'
// import apiRequest from './apiRequest';

// const UpdateContent = ({ todos, setTodos }) => {
//     const API_URL = 'http://localhost:3500/todos';

//     const handleCheck = async (id) => {
//         const listTodos = todos.map((todo) => todo.id === id ? { ...todo, title: !todo.checked } : todo);
//         setTodos(listTodos);
    
//         const myItem = listTodos.filter((item) => item.id === id);
//         const updateOptions = {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ checked: myItem[0].checked })
//         };
//         const reqUrl = `${API_URL}/${id}`;
//         const result = await apiRequest(reqUrl, updateOptions);
//         // if (result) setFetchError(result);
//       }



//   return (
//     <div className='theNewContent'>
//         <form onSubmit={hundleSubmit(onSubmit)}>
//         <input type="text" />
//         <button>send</button>
//         </form>
//     </div>
//   )
// }

// export default UpdateContent