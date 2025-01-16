import { useState, useEffect, useCallback } from 'react';
import { SearchState, SearchResult } from './types';
import { searchApi } from './api';

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos

interface CacheItem {
  results: SearchResult[];
  timestamp: number;
}

export const useSearch = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null,
  });

  const cache = new Map<string, CacheItem>();

  const search = useCallback(async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const cachedItem = cache.get(query);
      if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
        setState(prev => ({ ...prev, results: cachedItem.results, isLoading: false }));
        return;
      }

      const results = await searchApi(query);
      cache.set(query, { results, timestamp: Date.now() });
      setState(prev => ({ ...prev, results, isLoading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: (error as Error).message, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (state.query) {
        search(state.query);
      } else {
        setState(prev => ({ ...prev, results: [], isLoading: false, error: null }));
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [state.query, search]);

  const setQuery = (query: string) => {
    setState(prev => ({ ...prev, query }));
  };

  return { ...state, setQuery };
};

