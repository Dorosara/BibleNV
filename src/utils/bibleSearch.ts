import type { BibleVerse, SearchResult } from '../types/bible';

// Simple search implementation using text matching
export function searchBible(query: string, verses: BibleVerse[]): SearchResult[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return verses
    .map(verse => {
      const text = verse.text.toLowerCase();
      const relevance = searchTerms.reduce((score, term) => 
        score + (text.includes(term) ? 1 : 0), 0);
      
      return { verse, relevance };
    })
    .filter(result => result.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
}