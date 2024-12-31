import { BibleVerse } from '../../types/bible';

const VERSE_PATTERN = /^(\d+)\s+(.+)$/;

export function parseVerses(text: string): BibleVerse[] {
  const lines = text.split('\n');
  const verses: BibleVerse[] = [];

  let currentBook = '';
  let currentChapter = 1;

  for (const line of lines) {
    const match = line.match(VERSE_PATTERN);
    if (match) {
      const [, verseNumber, verseText] = match;
      verses.push({
        book: currentBook,
        chapter: currentChapter,
        verse: parseInt(verseNumber, 10),
        text: verseText.trim()
      });
    }
  }

  return verses;
}