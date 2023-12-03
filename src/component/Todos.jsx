import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import apiRequest from './apiRequest';
import UpdateContent from './UpdateContent'
import DisplayOptions from './DisplayOptions';
import SearchBy from './SearchBy';

const Todos = () => {
  const API_URL = 'http://localhost:3500/todos';

  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [searchOption, setSearchOption] = useState('title');
  const [displayOption, setDisplayOption] = useState('id');

  const handleSearchPropertyChange = (property) => {
    setSearchOption(property);
  };

  const handleDisplayOptionChange = (option) => {
    setDisplayOption(option);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      // Find the maximum id in the current todos
      const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 200;

      // Create the new todo with an id one greater than the maximum
      const todoToAdd = {
        id: maxId + 1,
        title: newTodo,
        checked: false,
      };

      // Update the local state with the new todo
      setTodos([...todos, todoToAdd]);

      // Clear the input field after adding todo
      setNewTodo('');

      // Now, make the API request to add the todo to the server
      const addOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoToAdd),
      };

      try {
        const response = await fetch(API_URL, addOptions);
        const data = await response.json();
        // Handle the response if needed
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };


  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      let data = await response.json();

      // Sort todos based on displayOption
      switch (displayOption) {
        case 'id':
          data = data.sort((a, b) => a.id - b.id);
          break;
        case 'title':
          data = data.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'completed':
          data = data.sort((a, b) => {
            // Sort uncompleted first, then completed
            if (a.checked && !b.checked) return 1;
            if (!a.checked && b.checked) return -1;
            return 0;
          });
          break;
        default:
          // Default to sorting by ID
          data = data.sort((a, b) => a.id - b.id);
          break;
      }

      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, [displayOption]);

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




  // Modify the todoSearch function to use the selected search option
  const todoSearch = async (value) => {
    let response = await fetch(API_URL);
    let data = await response.json();
    let filteredData;

    switch (searchOption) {
      case 'id':
        filteredData = data.filter((item) => item.id.toString().includes(value));
        break;
      case 'completed':
        filteredData = data.filter((item) => !item.checked && item.title.toLowerCase().includes(value.toLowerCase())); break;
      default:
        // Default to searching by title
        filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        break;
    }

    setTodos(filteredData);
  };

  return (
    <>
      <div className='todoContainer'>
        <h2>Todos</h2>

        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add todo...'
          />
          <button type="submit">Add Todo</button>
        </form>
        <DisplayOptions
          displayOption={displayOption}
          handleDisplayOptionChange={handleDisplayOptionChange}
        />
        <SearchBy
          handleSearchPropertyChange={handleSearchPropertyChange}
          todoSearch={todoSearch}
          searchOption={searchOption}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;