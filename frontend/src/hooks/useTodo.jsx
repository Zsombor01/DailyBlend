import {useEffect, useState} from 'react';
import axios from 'axios';

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3333/todos', {
          withCredentials: true
        });
        setTodos(response.data);
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (todoInput.trim()) {
      try {
        const response = await axios.post('http://localhost:3333/todos', 
          { text: todoInput },
          { withCredentials: true }
        );
        setTodos([...todos, response.data]);
        setTodoInput("");
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };

  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3333/todos/${id}`, 
        {},
        { withCredentials: true }
      );
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/todos/${id}`, {
        withCredentials: true
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    todoInput,
    setTodoInput,
  }
}

export default useTodo
