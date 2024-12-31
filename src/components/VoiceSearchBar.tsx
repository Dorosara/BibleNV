import React from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { useVoiceInput } from '../hooks/voice/useVoiceInput';

interface VoiceSearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export function VoiceSearchBar({ onSearch, isSearching = false }: VoiceSearchBarProps) {
  const { isListening, startListening, stopListening } = useVoiceInput();
  const [query, setQuery] = React.useState('');

  const handleVoiceInput = async () => {
    if (isListening) {
      stopListening();
      return;
    }

    const text = await startListening();
    if (text) {
      setQuery(text);
      onSearch(text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or speak to search..."
          className="w-full px-4 py-2 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          disabled={isSearching || isListening}
        />
        <div className="absolute right-2 flex gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isSearching}
            className={`p-2 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button
            type="submit"
            disabled={isSearching || isListening}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}