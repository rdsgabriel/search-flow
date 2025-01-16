import React from 'react';
import { useSearch } from './useSearch';
import { SearchResults } from './SearchResults';

export const SearchBar: React.FC = () => {
  const { query, results, isLoading, error, setQuery } = useSearch();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {results.length > 0 && <SearchResults results={results} query={query} />}
    </div>
  );
};

