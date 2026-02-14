import React, { useState, useMemo, Suspense } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/TodoCard';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';
import Loading from '../components/Loading';

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const itemsPerPage = 10;

  const { todos, loading, error, totalPages, refetch } = useTodos(currentPage, itemsPerPage);

  // Filter and search todos
  const filteredTodos = useMemo(() => {
   let result = todos || [];

    // Apply search filter
    if (searchTerm) {
    result = result.filter((todo) =>
      (todo?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Todos</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
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
    </div>
  );
};

export default TodoList;