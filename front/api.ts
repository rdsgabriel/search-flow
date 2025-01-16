import { SearchResult } from './types';

const mockData: SearchResult[] = [
  { id: '1', title: 'React', description: 'A JavaScript library for building user interfaces' },
  { id: '2', title: 'TypeScript', description: 'Typed JavaScript at Any Scale' },
  { id: '3', title: 'Tailwind CSS', description: 'A utility-first CSS framework' },
];

export const searchApi = async (query: string): Promise<SearchResult[]> => {
  // Simula uma chamada de API com um atraso
  await new Promise(resolve => setTimeout(resolve, 300));

  if (query.toLowerCase() === 'error') {
    throw new Error('Erro na busca');
  }

  return mockData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );
};

