// src/components/Navbar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

describe('Navbar', () => {
  afterEach(() => localStorage.clear());

  it('shows Sign Up and Log In when not authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.queryByText('Favorites')).toBeNull();
    expect(screen.queryByText(/Hello,/)).toBeNull();
    expect(screen.queryByText('Logout')).toBeNull();
  });

  it('shows Favorites, greeting, and Logout when authenticated', () => {
    // Simulate a logged-in user
    localStorage.setItem('currentUser', JSON.stringify({ username: 'alice' }));

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
    expect(screen.queryByText('Sign Up')).toBeNull();
    expect(screen.queryByText('Log In')).toBeNull();
  });
});
