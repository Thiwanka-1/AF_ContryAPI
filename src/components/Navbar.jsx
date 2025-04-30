import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate          = useNavigate();
  const location          = useLocation();
  const initialSearch     = new URLSearchParams(location.search).get('search') || '';
  const [term, setTerm]   = useState(initialSearch);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const delay = setTimeout(() => {
      navigate(term ? `/?search=${encodeURIComponent(term)}` : '/', { replace: true });
    }, 300);
    return () => clearTimeout(delay);
  }, [term, navigate, location.pathname]);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">Rest Countries</Link>
        <input
          value={term}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search countries..."
          className="mt-3 md:mt-0 w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="mt-3 md:mt-0 flex items-center">
          {user ? (
            <>
              <Link to="/favorites" className="mr-4 text-blue-600 hover:underline">Favorites</Link>
              <span className="mr-4">Hello, {user.username}</span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
