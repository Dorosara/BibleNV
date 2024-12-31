import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { startVoiceInput } from '../utils/voiceInput';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export function SearchBar({ onSearch, isSearching = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleVoiceInput = async () => {
    try {
      const text = await startVoiceInput();
      setQuery(text);
      onSearch(text);
    } catch (error) {
      console.error('Voice input error:', error);
      // In production, show a user-friendly error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the Bible..."
          className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          disabled={isSearching}
        />
        <div className="absolute right-2 flex gap-2">
          <button 
            type="button" 
            onClick={handleVoiceInput}
            disabled={isSearching}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <Mic size={20} />
          </button>
          <button 
            type="submit"
            disabled={isSearching} 
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}