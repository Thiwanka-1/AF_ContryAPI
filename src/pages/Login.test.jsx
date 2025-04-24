// src/pages/Login.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';

describe('Login page', () => {
  it('logs in and redirects home', async () => {
    const user = userEvent.setup();
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

    await user.type(screen.getByLabelText(/Username/i), 'bob');
    await user.type(screen.getByLabelText(/Password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /Log In/i }));

    expect(await screen.findByText('HOME PAGE')).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem('user'));
    expect(stored.username).toBe('bob');
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
