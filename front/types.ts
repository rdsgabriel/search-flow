export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

