// src/components/FavoriteButton.jsx
import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoriteButton({ code }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(code);

  return (
    <button
      onClick={e => {
        e.stopPropagation();        // don’t trigger card click
        toggleFavorite(code);
      }}
      aria-label={isFav ? 'Remove favorite' : 'Add to favorites'}
      className="text-xl"
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
}
