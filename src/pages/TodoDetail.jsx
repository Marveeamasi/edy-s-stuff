import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTodoById } from '../hooks/useTodos';
import Loading from '../components/Loading';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todo, loading, error } = useTodoById(id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading text="Loading todo details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Todo</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Todos
          </button>
        </div>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">Todo Not Found</h2>
          <p className="text-yellow-700 mb-4">The requested todo could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Todos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6" aria-label="Breadcrumb">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Todos
        </Link>
      </nav>

      <article className="bg-white rounded-lg shadow-lg p-8">
        <header className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{todo.title}</h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm ${
                    todo.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                  aria-label={`Status: ${todo.completed ? 'Completed' : 'Incomplete'}`}
                >
                  {todo.completed ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Completed
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Incomplete
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          {todo.description && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{todo.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            {todo.id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Todo ID</h3>
                <p className="text-gray-900 font-mono">{todo.id}</p>
              </div>
            )}

            {todo.createdAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                <time className="text-gray-900" dateTime={todo.createdAt}>
                  {new Date(todo.createdAt).toLocaleString()}
                </time>
              </div>
            )}

            {todo.updatedAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                <time className="text-gray-900" dateTime={todo.updatedAt}>
                  {new Date(todo.updatedAt).toLocaleString()}
                </time>
              </div>
            )}

            {todo.userId && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
                <p className="text-gray-900 font-mono">{todo.userId}</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default TodoDetail;