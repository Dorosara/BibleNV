import React from 'react';
import { Volume2, BookmarkPlus } from 'lucide-react';
import { BibleVerse } from '../types/bible';
import { speak } from '../utils/speech';

interface VerseCardProps {
  verse: BibleVerse;
}

export function VerseCard({ verse }: VerseCardProps) {
  const handleSpeak = () => {
    speak(verse.text);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">
          {verse.book} {verse.chapter}:{verse.verse}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleSpeak}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <Volume2 size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <BookmarkPlus size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-700">{verse.text}</p>
    </div>
  );
}