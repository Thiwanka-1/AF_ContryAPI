import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const { login }                     = useAuth();
  const navigate                      = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both fields.');
      return;
    }
    try {
      login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-username" className="block mb-1 font-medium">
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Your username"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="relative">
              <label htmlFor="login-password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full border px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-7"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://img.freepik.com/free-vector/countries-signs_23-2147502528.jpg"
          alt="World Map"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
}
