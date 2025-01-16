export interface SearchResult {
  id: string
  title: string
}

export interface SearchHookResult {
  results: string[]
  isLoading: boolean
  error: string | null
}

