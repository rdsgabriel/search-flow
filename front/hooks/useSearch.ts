'use client'

import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { searchApi } from '@/services/api'

export const useSearch = (query: string) => {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchCache = new Map<string, string[]>()

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        if (searchCache.has(searchQuery)) {
          setResults(searchCache.get(searchQuery) || [])
        } else {
          const data = await searchApi(searchQuery)
          setResults(data)
          searchCache.set(searchQuery, data)
        }
      } catch (err) {
        setError('Ocorreu um erro durante a busca. Por favor, tente novamente.')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  return { results, isLoading, error }
}

