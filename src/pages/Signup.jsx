import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';

export default function Signup() {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup }                = useAuth();
  const navigate                  = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }
    try {
      signup(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <FaUserPlus className="mr-2" /> Sign Up
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-username" className="block mb-1 font-medium">
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="relative">
              <label htmlFor="signup-password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Choose a password"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://img.freepik.com/free-photo/travel-again-concept-arrangement_23-2149064590.jpg?ga=GA1.1.1617633811.1740464666&semt=ais_hybrid&w=740"
          alt="Sign up illustration"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
}
