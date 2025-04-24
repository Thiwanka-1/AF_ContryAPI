// src/components/Navbar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

describe('Navbar', () => {
  afterEach(() => localStorage.clear());

  it('shows Login when not authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Favorites')).toBeNull();
  });

  it('shows Favorites and Logout when authenticated', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'alice' }));
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Hello, alice')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
