import React, { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

const Todos = () => {

  const API_URL = 'http://localhost:3500/todos';

  const [todos, setTodos] = useState([]);

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


  return (
    <>
      <div className='todoContainer'> <h1>Todos</h1>
        {todos.map((todo, index) => (

          <div className='todoBox' key={index}>
            <input
              type="checkbox"
              className='checkbox'
              checked={todo.checked}
              onChange={() => handleCheck(todo.id)}
            />
            Note.{todo.id} {todo.title} 
            
            <button onClick={()=>handleDelete(todo.id)}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;

