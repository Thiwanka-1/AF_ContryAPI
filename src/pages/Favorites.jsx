// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { fetchCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';
import Loading from '../components/Loading';

export default function Favorites() {
  const { favorites } = useFavorites();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = [];
      for (const code of favorites) {
        const c = await fetchCountryByCode(code);
        data.push(c[0]);
      }
      setCountries(data);
      setLoading(false);
    }
    if (favorites.length) load();
    else setCountries([]);
  }, [favorites]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Your Favorites</h1>
      {loading ? (
        <Loading />
      ) : countries.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map(c => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      ) : (
        <p>You have no favorite countries yet.</p>
      )}
    </div>
  );
}
