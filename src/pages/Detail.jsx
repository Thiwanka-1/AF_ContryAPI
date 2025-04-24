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
        setError('Failed to load country details.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) return <Loading />;
  if (error)   return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!country) return null;

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders
  } = country;

  const nativeName = name.nativeName
    ? Object.values(name.nativeName)[0].common
    : name.common;
  const currencyList = currencies
    ? Object.values(currencies).map(c => c.name).join(', ')
    : 'N/A';
  const languageList = languages
    ? Object.values(languages).join(', ')
    : 'N/A';
  const capitalList = capital ? capital.join(', ') : 'N/A';
  const domainList = tld ? tld.join(', ') : 'N/A';

  return (
    <div className="px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-white px-6 py-2 rounded shadow hover:bg-gray-100 transition"
      >
        ← Back
      </button>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Flag */}
        <img
          src={flags.svg}
          alt={`Flag of ${name.common}`}
          className="w-full lg:w-1/2 h-auto rounded-lg shadow"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">{name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p><span className="font-semibold">Native Name:</span> {nativeName}</p>
              <p><span className="font-semibold">Population:</span> {population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {region}</p>
              <p><span className="font-semibold">Sub Region:</span> {subregion}</p>
              <p><span className="font-semibold">Capital:</span> {capitalList}</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Top Level Domain:</span> {domainList}</p>
              <p><span className="font-semibold">Currencies:</span> {currencyList}</p>
              <p><span className="font-semibold">Languages:</span> {languageList}</p>
            </div>
          </div>

          {borders && borders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Border Countries:</h2>
              <div className="flex flex-wrap gap-3">
                {borders.map(b => (
                  <button
                    key={b}
                    onClick={() => navigate(`/country/${b}`)}
                    className="bg-white px-4 py-2 rounded shadow hover:bg-gray-100 transition"
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
