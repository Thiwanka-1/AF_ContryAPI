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

  it('toggles and persists favorites', () => {
    // set a logged-in user
    localStorage.setItem('user', JSON.stringify({ username: 'charlie' }));

    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComp />
        </FavoritesProvider>
      </AuthProvider>
    );

    // initially empty
    expect(screen.getByTestId('list').textContent).toBe('');

    // toggle on
    act(() => screen.getByText('Toggle USA').click());
    expect(screen.getByTestId('list').textContent).toBe('USA');
    // now persisted under favorites_charlie
    expect(localStorage.getItem('favorites_charlie')).toContain('USA');

    // toggle off
    act(() => screen.getByText('Toggle USA').click());
    expect(screen.getByTestId('list').textContent).toBe('');
  });
});
