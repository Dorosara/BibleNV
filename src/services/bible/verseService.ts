import { BibleVerse } from '../../types/bible';
import { searchVersesByText } from './searchService';

export class VerseService {
  private verses: BibleVerse[] = [];

  async addVerses(newVerses: BibleVerse[]): Promise<void> {
    this.verses.push(...newVerses);
  }

  async getVersesByBook(book: string): Promise<BibleVerse[]> {
    return this.verses.filter(verse => verse.book === book);
  }

  async getVersesByChapter(book: string, chapter: number): Promise<BibleVerse[]> {
    return this.verses.filter(
      verse => verse.book === book && verse.chapter === chapter
    );
  }

  async searchVerses(query: string): Promise<BibleVerse[]> {
    return searchVersesByText(this.verses, query);
  }
}