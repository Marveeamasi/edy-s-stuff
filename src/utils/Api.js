import axios from 'axios';

const API_BASE_URL = 'https://api.oluwasetemi.dev';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API methods
export const todoAPI = {
  // GET /todos - List all todos
  getTodos: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/tasks', {
      params: { page, limit }
    });
    return response.data;
  },

  // GET /todos/{id} - Get a single todo
  getTodoById: async (id) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  // POST /todos - Create a todo
  createTodo: async (todoData) => {
    const response = await apiClient.post('/tasks', todoData);
    return response.data;
  },

  // PUT /todos/{id} - Update a todo
  updateTodo: async (id, todoData) => {
    const response = await apiClient.put(`/tasks/${id}`, todoData);
    return response.data;
  },

  // DELETE /todos/{id} - Delete a todo
  deleteTodo: async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default apiClient;