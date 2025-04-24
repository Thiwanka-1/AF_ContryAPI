import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountryCard from './CountryCard';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const mockCountry = {
  flags: { svg: 'flag.svg' },
  name: { common: 'Testland' },
  population: 123456,
  region: 'TestRegion',
  capital: ['TestCity'],
  cca3: 'TST',
};

describe('CountryCard', () => {
  it('renders info and navigates on click', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <FavoritesProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<CountryCard country={mockCountry} />} />
              <Route path="/country/:code" element={<div>DETAIL PAGE</div>} />
            </Routes>
          </MemoryRouter>
        </FavoritesProvider>
      </AuthProvider>
    );

    // Basic render assertions
    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText('123,456')).toBeInTheDocument();
    expect(screen.getByText('TestRegion')).toBeInTheDocument();
    expect(screen.getByText('TestCity')).toBeInTheDocument();

    // Click to navigate
    await user.click(screen.getByText('Testland'));
    expect(await screen.findByText('DETAIL PAGE')).toBeInTheDocument();
  });
});
