// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion
} from '../services/api';
import CountryCard from '../components/CountryCard';
import Loading from '../components/Loading';

export default function Home() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get('search') || '';

  const [countries, setCountries] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [region, setRegion]     = useState('');
  const [language, setLanguage] = useState('');
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
        // extract unique languages
        const langs = new Set();
        data.forEach(c => {
          if (c.languages) {
            Object.values(c.languages).forEach(l => langs.add(l));
          }
        });
        setAllLanguages([...langs].sort());
      } catch {
        setError('Failed to load countries');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, region]);

  const filtered = language
    ? countries.filter(c =>
        c.languages && Object.values(c.languages).includes(language)
      )
    : countries;

  return (
    <>
      <div className="flex justify-between mb-4">
        <select
          value={region}
          onChange={e => { setRegion(e.target.value); setLanguage(''); }}
          className="border p-2 rounded"
        >
          <option value="">All Regions</option>
          {['Africa','Americas','Asia','Europe','Oceania'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Languages</option>
          {allLanguages.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(c => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </>
  );
}
