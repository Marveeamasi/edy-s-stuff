import React from 'react';
import { Link } from 'react-router-dom';

const TodoCard = ({ todo }) => {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <Link 
              to={`/todos/${todo.id}`}
              className="hover:text-blue-600 focus:outline-none focus:underline"
            >
              {todo.title}
            </Link>
          </h3>
          
          {todo.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {todo.description}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${
                todo.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
              aria-label={`Status: ${todo.completed ? 'Completed' : 'Incomplete'}`}
            >
              {todo.completed ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Completed
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Incomplete
                </>
              )}
            </span>

            {todo.createdAt && (
              <time className="text-gray-500" dateTime={todo.createdAt}>
                {new Date(todo.createdAt).toLocaleDateString()}
              </time>
            )}
          </div>
        </div>

        <Link
          to={`/todos/${todo.id}`}
          className="ml-4 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          aria-label={`View details for ${todo.title}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default TodoCard;