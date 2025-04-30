// src/contexts/FavoritesContext.test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

function TestComp() {
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <div>
      <span data-testid="list">{favorites.join(',')}</span>
      <button onClick={() => toggleFavorite('USA')}>Toggle USA</button>
    </div>
  );
}

describe('FavoritesContext', () => {
  beforeEach(() => localStorage.clear());

  it('toggles and persists favorites for the current user', () => {
    // Simulate a logged-in user in AuthContext
    localStorage.setItem('currentUser', JSON.stringify({ username: 'charlie' }));

    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComp />
        </FavoritesProvider>
      </AuthProvider>
    );

    // Initially no favorites
    expect(screen.getByTestId('list').textContent).toBe('');

    // Toggle on
    act(() => screen.getByText('Toggle USA').click());
    expect(screen.getByTestId('list').textContent).toBe('USA');

    // Now persisted under "favorites_charlie"
    expect(localStorage.getItem('favorites_charlie')).toContain('USA');

    // Toggle off
    act(() => screen.getByText('Toggle USA').click());
    expect(screen.getByTestId('list').textContent).toBe('');
  });
});
