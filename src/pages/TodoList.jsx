import React, { useState, useMemo, Suspense } from 'react';
import { useTodos } from '../hooks/useTodos';
import { todoAPI } from '../utils/api';
import TodoCard from '../components/TodoCard';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';
import Loading from '../components/Loading';
import TodoModal from '../components/TodoModal';

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState(null);
  const itemsPerPage = 10;

  const { todos, loading, error, totalPages, refetch } = useTodos(currentPage, itemsPerPage);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle create todo
  const handleCreateTodo = async (formData) => {
    try {
      setIsCreating(true);
      await todoAPI.createTodo(formData);
      showNotification('Todo created successfully!', 'success');
      setIsModalOpen(false);
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Error creating todo:', err);
      showNotification(err.message || 'Failed to create todo', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Apply search filter
    if (searchTerm) {
      result = result.filter((todo) =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filter === 'completed') {
      result = result.filter((todo) => todo.completed);
    } else if (filter === 'incomplete') {
      result = result.filter((todo) => !todo.completed);
    }

    return result;
  }, [todos, searchTerm, filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Todos</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
          role="alert"
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Todos</h1>
            <p className="text-gray-600">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-md"
            aria-label="Create new todo"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Todo
          </button>
        </div>
      </header>

      <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />

      {loading ? (
        <Loading text="Loading todos..." />
      ) : filteredTodos.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No todos found</h2>
          <p className="text-gray-600">
            {searchTerm || filter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first todo'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {filteredTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Create Todo Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTodo}
        isLoading={isCreating}
      />
    </div>
  );
};

export default TodoList;