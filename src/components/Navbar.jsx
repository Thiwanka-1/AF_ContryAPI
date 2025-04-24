// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // initialize term from URL on first render
  const initialSearch = new URLSearchParams(location.search).get('search') || '';
  const [term, setTerm] = useState(initialSearch);

  // live‐search: debounce 300ms, update ?search=… but only when on Home ("/")
  useEffect(() => {
    if (location.pathname !== '/') return;  // don’t redirect from other pages

    const handler = setTimeout(() => {
      const target = term.trim()
        ? `/?search=${encodeURIComponent(term.trim())}`
        : '/';
      navigate(target, { replace: true });
    }, 300);

    return () => clearTimeout(handler);
  }, [term, navigate, location.pathname]);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Rest Countries
        </Link>

        {/* Search Input */}
        <div className="mt-3 md:mt-0 w-full md:max-w-md">
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search countries..."
            className="lg:w-full md:w-80 sm:w-full w-full px-4 py-2 md:ml-8 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Auth Links */}
        <div className="mt-3 md:mt-0 flex items-center">
          {user ? (
            <>
              <Link
                to="/favorites"
                className="mr-4 text-blue-600 hover:underline transition"
              >
                Favorites
              </Link>
              <span className="mr-4 text-gray-700">Hello, {user.username}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
