import { BibleVerse } from '../../types/bible';

export function searchVersesByText(verses: BibleVerse[], query: string): BibleVerse[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return verses.filter(verse => 
    searchTerms.some(term => 
      verse.text.toLowerCase().includes(term) ||
      verse.book.toLowerCase().includes(term)
    )
  );
}