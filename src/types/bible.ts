export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface SearchResult {
  verse: BibleVerse;
  relevance: number;
}

export interface BibleBook {
  name: string;
  chapters: number;
}