import type { BibleVerse } from '../types/bible';

class BibleDataService {
  private verses: BibleVerse[] = [];
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // In production, this would load from IndexedDB or similar
      this.verses = await this.loadInitialData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Bible data:', error);
      throw error;
    }
  }

  private async loadInitialData(): Promise<BibleVerse[]> {
    // Placeholder for actual data loading
    return [
      {
        book: "Genesis",
        chapter: 1,
        verse: 1,
        text: "In the beginning God created the heavens and the earth."
      }
    ];
  }

  async searchVerses(query: string): Promise<BibleVerse[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    return this.verses.filter(verse => 
      searchTerms.some(term => 
        verse.text.toLowerCase().includes(term)
      )
    );
  }

  async getVersesByBook(book: string): Promise<BibleVerse[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    return this.verses.filter(verse => verse.book === book);
  }
}

export const bibleDataService = new BibleDataService();