import {useState} from 'react'

const AddContent = ({API_URL,id,todos,setTodos,fetchTodos}) => {
  const [newTodo, setNewTodo] = useState('');


    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
          const todoToAdd = {
            userId: id,
            title: newTodo,
            checked: false,
          };
    
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
            setTodos([...todos, todoToAdd]);
            setNewTodo('');
          } catch (error) {
            console.error('Error adding todo:', error);
          }
        }
        fetchTodos();
      };
  return (
    <form className='addTodoForm' onSubmit={handleAddTodo}>
          <input
            className='addTodo'
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add todo...'
          />
          <button className='addTodoSubmit' type="submit">Add Todo</button>
    </form>
  )
}

export default AddContent