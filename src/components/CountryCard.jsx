// src/components/CountryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

export default function CountryCard({ country }) {
  const navigate = useNavigate();
  const { flags, name, population, region, capital, cca3 } = country;

  return (
    <div
      onClick={() => navigate(`/country/${cca3}`)}
      className="relative cursor-pointer bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
    >
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton code={cca3} />
      </div>
      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold mb-2">{name.common}</h2>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capital?.join(', ')}</p>
      </div>
    </div>
  );
}
