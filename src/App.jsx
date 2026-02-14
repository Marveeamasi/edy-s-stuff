import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetail';
import NotFound from './pages/NotFound';
import ErrorTest from './pages/ErrorTest';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                <a href="/" className="hover:text-blue-600 focus:outline-none focus:underline">
                 Edy's Todo Application
                </a>
              </h1>
            </div>
          </header>

          <main>
            <Suspense fallback={<Loading text="Loading page..." />}>
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todos/:id" element={<TodoDetail />} />
                <Route path="/error-test" element={<ErrorTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Edy's Todo Application. Built with React, Tailwind CSS, and React Router.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;