import React from 'react';
import { SearchResult } from './types';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, index) => 
    regex.test(part) ? <mark key={index} className="bg-yellow-200">{part}</mark> : part
  );
};

export const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  return (
    <ul className="mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
      {results.map((result) => (
        <li key={result.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <h3 className="font-semibold">{highlightMatch(result.title, query)}</h3>
          <p className="text-sm text-gray-600">{highlightMatch(result.description, query)}</p>
        </li>
      ))}
    </ul>
  );
};

