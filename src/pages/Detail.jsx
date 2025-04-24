// src/pages/Detail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryByCode } from '../services/api';
import Loading from '../components/Loading';

export default function Detail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchCountryByCode(code);
        setCountry(data[0]);
      } catch {
        setError('Failed to load details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) return <Loading />;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (!country) return null;

  const {
    flags, name, population, region, subregion,
    capital, tld, currencies, languages, borders
  } = country;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white px-4 py-2 rounded shadow"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className="w-full lg:w-1/2 h-auto object-cover"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{name.common}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p><strong>Native Name:</strong> {Object.values(name.nativeName)[0].common}</p>
              <p><strong>Population:</strong> {population.toLocaleString()}</p>
              <p><strong>Region:</strong> {region}</p>
              <p><strong>Sub Region:</strong> {subregion}</p>
              <p><strong>Capital:</strong> {capital?.join(', ')}</p>
            </div>

            <div>
              <p><strong>Top Level Domain:</strong> {tld?.join(', ')}</p>
              <p><strong>Currencies:</strong> {currencies && Object.values(currencies).map(c => c.name).join(', ')}</p>
              <p><strong>Languages:</strong> {languages && Object.values(languages).join(', ')}</p>
            </div>
          </div>

          {borders?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borders.map(b => (
                  <button
                    key={b}
                    onClick={() => navigate(`/country/${b}`)}
                    className="bg-white px-3 py-1 rounded shadow"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
