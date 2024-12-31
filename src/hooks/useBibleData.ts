import { useState, useEffect } from 'react';
import type { BibleVerse } from '../types/bible';
import { bibleDataService } from '../services/bibleDataService';

export function useBibleData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeBibleData();
  }, []);

  async function initializeBibleData() {
    try {
      await bibleDataService.initialize();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load Bible data'));
    } finally {
      setIsLoading(false);
    }
  }

  async function searchVerses(query: string): Promise<BibleVerse[]> {
    if (isLoading) return [];
    if (error) throw error;
    
    return bibleDataService.searchVerses(query);
  }

  return {
    isLoading,
    error,
    searchVerses
  };
}