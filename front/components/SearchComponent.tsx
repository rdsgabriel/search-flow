'use client'

import { useState } from 'react'
import { useSearch } from '@/hooks/useSearch'
import SuggestionsList from './SuggestionsList'
import { Search } from 'lucide-react'
import LoadingIndicator from './LoadingIndicator'

const SearchComponent = () => {
  const [query, setQuery] = useState('')
  const { results, isLoading, error } = useSearch(query)

  return (
    <div className="w-full max-w-2xl mx-auto mb-16">
      <div className="relative group">
        <div className="absolute inset-0 bg-violet-200 opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-lg" />
        <div className="relative bg-white rounded-lg shadow-xl border border-violet-100">
          <div className="flex items-center px-4 h-14">
            <Search className="w-5 h-5 text-violet-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Comece a digitar para buscar..."
              className="w-full px-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none placeholder:text-gray-400"
            />
            {isLoading && <LoadingIndicator />}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
        <SuggestionsList suggestions={results} query={query} />
      </div>
    </div>
  )
}

export default SearchComponent

