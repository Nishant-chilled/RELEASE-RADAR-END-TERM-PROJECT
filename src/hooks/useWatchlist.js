import { useCallback, useEffect, useState } from 'react';
import {
  createWatchlistItem,
  deleteWatchlistItem,
  getWatchlist,
  updateWatchlistItem,
} from '../services/watchlistService';
import { useAuth } from './useAuth';

const WATCHLIST_CACHE_KEY = 'release-radar-watchlist';

export function useWatchlist() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getCacheKey = useCallback(() => {
    return user ? `${WATCHLIST_CACHE_KEY}-${user.uid}` : WATCHLIST_CACHE_KEY;
  }, [user]);

  const loadWatchlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const cached = localStorage.getItem(getCacheKey());
      if (cached) {
        setItems(JSON.parse(cached));
      }

      const data = await getWatchlist(user.uid);
      setItems(data);
      localStorage.setItem(getCacheKey(), JSON.stringify(data));
    } catch (err) {
      console.error('Failed to load watchlist:', err);
      setError(err.message || 'Failed to load watchlist.');
    } finally {
      setLoading(false);
    }
  }, [user, getCacheKey]);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  const addItem = useCallback(
    async (item) => {
      if (!user) return false;

      const alreadyExists = items.some(
        (savedItem) => savedItem.externalId === item.externalId
      );

      if (alreadyExists) return false;

      try {
        const savedItem = await createWatchlistItem({
          ...item,
          userId: user.uid,
        });

        const updatedItems = [savedItem, ...items];
        setItems(updatedItems);
        localStorage.setItem(getCacheKey(), JSON.stringify(updatedItems));

        return true;
      } catch (err) {
        console.error('Failed to add watchlist item:', err);
        setError(err.message || 'Failed to save item.');
        return false;
      }
    },
    [user, items, getCacheKey]
  );

  const updateItem = useCallback(
    async (id, updates) => {
      try {
        await updateWatchlistItem(id, updates);

        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        );

        setItems(updatedItems);
        localStorage.setItem(getCacheKey(), JSON.stringify(updatedItems));
      } catch (err) {
        console.error('Failed to update watchlist item:', err);
        setError(err.message || 'Failed to update item.');
      }
    },
    [items, getCacheKey]
  );

  const removeItem = useCallback(
    async (id) => {
      try {
        await deleteWatchlistItem(id);

        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem(getCacheKey(), JSON.stringify(updatedItems));
      } catch (err) {
        console.error('Failed to delete watchlist item:', err);
        setError(err.message || 'Failed to delete item.');
      }
    },
    [items, getCacheKey]
  );

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    refresh: loadWatchlist,
  };
}