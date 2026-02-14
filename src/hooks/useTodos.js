import { useState, useEffect } from 'react';
import { todoAPI } from '../utils/api';

export const useTodos = (page = 1, limit = 10) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoAPI.getTodos(page, limit);
      
      console.log('Received data in hook:', data);
      
      // Handle different response structures
      let todosArray = [];
      let total = 0;
      
      if (Array.isArray(data)) {
        // Data is directly an array
        todosArray = data;
        total = data.length;
      } else if (data.todos && Array.isArray(data.todos)) {
        // Data has todos property
        todosArray = data.todos;
        total = data.total || data.todos.length;
      } else if (data.tasks && Array.isArray(data.tasks)) {
        // Data has tasks property
        todosArray = data.tasks;
        total = data.total || data.tasks.length;
      } else if (data.data && Array.isArray(data.data)) {
        // Data has data property
        todosArray = data.data;
        total = data.total || data.data.length;
      } else {
        console.error('Unexpected data structure:', data);
        todosArray = [];
        total = 0;
      }
      
      setTodos(todosArray);
      setTotalPages(data.totalPages || Math.ceil(total / limit));
    } catch (err) {
      setError(err.message || 'Failed to fetch todos');
      console.error('Error fetching todos:', err);
      setTodos([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, limit]);

  return { todos, loading, error, totalPages, refetch: fetchTodos };
};

export const useTodoById = (id) => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await todoAPI.getTodoById(id);
        setTodo(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch todo');
        console.error('Error fetching todo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  return { todo, loading, error };
};