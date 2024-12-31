import React from 'react';
import { SearchBar } from './components/SearchBar';
import { VerseCard } from './components/VerseCard';
import { Book } from 'lucide-react';
import { useBibleSearch } from './hooks/useBibleSearch';

function App() {
  const { results, isSearching, search } = useBibleSearch();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Bible Explorer</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={search} isSearching={isSearching} />
          
          <div className="w-full max-w-2xl space-y-4">
            {results.map((verse, index) => (
              <VerseCard key={index} verse={verse} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;