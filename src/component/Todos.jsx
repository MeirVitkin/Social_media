import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import apiRequest from './apiRequest';
import UpdateContent from './updateContent';

const Todos = () => {
  const API_URL = 'http://localhost:3500/todos';

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');


  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCheck = async (id) => {
    const listTodos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
    setTodos(listTodos);
    const myItem = listTodos.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    // if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listTodos = todos.filter((todo) => todo.id !== id);
    setTodos(listTodos);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    // if (result) setFetchError(result);
  }

  const handleUpdate = async (todo) => {
    setEditing(editing => (editing ? null : todo));
  };

  const handleUpdateContent = async (updatedTodo) => {
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTodo.title }),
    };
    const reqUrl = `${API_URL}/${updatedTodo.id}`;
    const result = await apiRequest(reqUrl, updateOptions);

    if (result) {
      console.error('Error updating todo:', result);
    } else {
      const updatedTodos = todos.map((t) =>
        t.id === updatedTodo.id ? { ...t, title: updatedTodo.title } : t
      );
      setTodos(updatedTodos);
      setEditing(null);
    }
  };

  const todoSearch = async (value) => {
    let response = await fetch(API_URL);
    let data = await response.json();
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setTodos(filteredData);
  }

  return (
    <>
      <div className='todoContainer'>
        <h2>Todos</h2>

        <input className='search'
          type="text"
          onChange={(e) => todoSearch(e.target.value)}
        />

        {todos.map((todo, index) => (
          <div className='todoBox' key={index}>
            <input
              type="checkbox"
              className='checkBox'
              checked={todo.checked}
              onChange={() => handleCheck(todo.id)}
            />
            <h3>Note.{todo.id}</h3>
            {editing && editing.id === todo.id ? (
              <UpdateContent
                todo={todo}
                onUpdate={handleUpdateContent}
              />
            ) : (
              <div
                className='updateContentClick'
                onDoubleClick={() => handleUpdate(todo)}
              >
                <div style={(todo.checked) ? { textDecoration: 'line-through' } : null}>{todo.title}</div>
              </div>
            )}
            <FaTrashAlt
              onClick={() => handleDelete(todo.id)}
              role="button"
              tabIndex="0"
              aria-label={`Delete`}
            />
            {/* <button className='deleteButton' onClick={() => handleDelete(todo.id)}>delete</button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;



// import React, { useState, useEffect } from 'react';
// import apiRequest from './apiRequest';
// import UpdateContent from './updateContent';

// const Todos = () => {

//   const API_URL = 'http://localhost:3500/todos';

//   const [todos, setTodos] = useState([]);
//   const [editing, setEditing] = useState(null);

//   const fetchTodos = async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setTodos(data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };
//   useEffect(() => {

//     fetchTodos();
//   }, []);


//   const handleCheck = async (id) => {
//     const listTodos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
//     setTodos(listTodos);

//     const myItem = listTodos.filter((item) => item.id === id);
//     const updateOptions = {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ checked: myItem[0].checked })
//     };
//     const reqUrl = `${API_URL}/${id}`;
//     const result = await apiRequest(reqUrl, updateOptions);
//     // if (result) setFetchError(result);
//   }

//   const handleDelete = async (id) => {
//     const listTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(listTodos);

//     const deleteOptions = { method: 'DELETE' };
//     const reqUrl = `${API_URL}/${id}`;
//     const result = await apiRequest(reqUrl, deleteOptions);
//     // if (result) setFetchError(result);
//   }

//   const handleUpdate = async (todo) => {
//     setEditing(editing => (editing ? null : todo));
//   }


//   return (
//     <>
//       <div className='todoContainer'> <h1>Todos</h1>
//         {todos.map((todo, index) => (
//           <div className='todoBox' key={index}>
//             <input
//               type="checkbox"
//               className='checkbox'
//               checked={todo.checked}
//               onChange={() => handleCheck(todo.id)}
//             />
//             Note.{todo.id} <div className='updateContentClick' onDoubleClick={() => handleUpdate(todo)}>{todo.title}</div>
//             <button onClick={() => handleDelete(todo.id)}>delete</button>
//             {editing && editing.id === todo.id && (
//               <UpdateContent
//                 todos={todos}
//                 setTodos={setTodos}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Todos;
