import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Signup from './Signup';

describe('Signup page', () => {
  beforeEach(() => localStorage.clear());

  it('registers a new user and redirects home', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<div>HOME PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill form
    await user.type(screen.getByLabelText(/Username/i), 'alice');
    await user.type(screen.getByLabelText(/Password/i), 'pw123');
    await user.click(screen.getByRole('button', { name: /Create Account/i }));

    // Should navigate
    expect(await screen.findByText('HOME PAGE')).toBeInTheDocument();

    // users map in localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    expect(users.alice).toBe('pw123');

    // currentUser set
    const current = JSON.parse(localStorage.getItem('currentUser'));
    expect(current.username).toBe('alice');
  });

  it('shows error when username already taken', async () => {
    const user = userEvent.setup();
    // Pre-register alice
    localStorage.setItem('users', JSON.stringify({ alice: 'pw123' }));

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    await user.type(screen.getByLabelText(/Username/i), 'alice');
    await user.type(screen.getByLabelText(/Password/i), 'newpass');
    await user.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(
      screen.getByText('Username already taken')
    ).toBeInTheDocument();
  });

  it('shows error when fields empty', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </AuthProvider>
    );

    await user.click(screen.getByRole('button', { name: /Create Account/i }));
    expect(
      screen.getByText('Both fields are required.')
    ).toBeInTheDocument();
  });
});
