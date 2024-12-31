import { useState } from 'react';
import { BibleVerse } from '../../types/bible';
import { VerseService } from '../../services/bible/verseService';

const verseService = new VerseService();

export function useVerseSearch() {
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = async (query: string) => {
    setIsSearching(true);
    setError(null);
    
    try {
      const searchResults = await verseService.searchVerses(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
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