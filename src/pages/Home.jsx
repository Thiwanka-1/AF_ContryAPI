// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation }              from 'react-router-dom';
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion
} from '../services/api';
import CountryCard from '../components/CountryCard';
import Loading     from '../components/Loading';

export default function Home() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get('search') || '';

  const [countries, setCountries]       = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [region, setRegion]             = useState('');
  const [language, setLanguage]         = useState('');
  const [allLanguages, setAllLanguages] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        let data;
        if (q) {
          data = await fetchCountryByName(q);
        } else if (region) {
          data = await fetchCountriesByRegion(region);
        } else {
          data = await fetchAllCountries();
        }

        setCountries(data);

        // build unique sorted language list
        const langs = new Set();
        data.forEach(c => {
          if (c.languages) {
            Object.values(c.languages).forEach(l => langs.add(l));
          }
        });
        setAllLanguages([...langs].sort());
      } catch (e) {
        console.error(e);
        setError('Failed to load countries.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [q, region]);

  // apply language filter client-side
  const displayed = language
    ? countries.filter(c =>
        c.languages && Object.values(c.languages).includes(language)
      )
    : countries;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <select
          value={region}
          onChange={e => {
            setRegion(e.target.value);
            setLanguage('');
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Regions</option>
          {['Africa','Americas','Asia','Europe','Oceania'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Languages</option>
          {allLanguages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayed.map(c => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}
