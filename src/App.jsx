// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import { useAuth } from './contexts/AuthContext';
import Favorites from './pages/Favorites';

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
        <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
