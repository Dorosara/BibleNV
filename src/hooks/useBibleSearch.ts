import { useState } from 'react';
import type { BibleVerse } from '../types/bible';
import { useBibleData } from './useBibleData';

export function useBibleSearch() {
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchVerses, isLoading, error } = useBibleData();

  const search = async (query: string) => {
    if (isLoading || error) return;
    
    setIsSearching(true);
    try {
      const searchResults = await searchVerses(query);
      setResults(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    results,
    isSearching,
    error,
    search
  };
}