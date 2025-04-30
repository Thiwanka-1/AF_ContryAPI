import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';

describe('Login page', () => {
  beforeEach(() => localStorage.clear());

  it('logs in an existing user and redirects home', async () => {
    const user = userEvent.setup();
    // Pre–register a user in localStorage
    localStorage.setItem('users', JSON.stringify({ bob: 'secret' }));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<div>HOME PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill in credentials
    await user.type(screen.getByLabelText(/Username/i), 'bob');
    await user.type(screen.getByLabelText(/Password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /Log In/i }));

    // Should navigate
    expect(await screen.findByText('HOME PAGE')).toBeInTheDocument();
    // currentUser saved
    const stored = JSON.parse(localStorage.getItem('currentUser'));
    expect(stored.username).toBe('bob');
  });

  it('shows error on invalid credentials', async () => {
    const user = userEvent.setup();
    // No users registered
    localStorage.setItem('users', JSON.stringify({}));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await user.type(screen.getByLabelText(/Username/i), 'alice');
    await user.type(screen.getByLabelText(/Password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /Log In/i }));

    expect(
      screen.getByText('Invalid username or password')
    ).toBeInTheDocument();
  });

  it('shows error when fields empty', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    await user.click(screen.getByRole('button', { name: /Log In/i }));
    expect(screen.getByText('Please enter both fields.')).toBeInTheDocument();
  });
});
