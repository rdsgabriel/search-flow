import React from 'react';
import { SearchBar } from './SearchBar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Busca com Autocomplete</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default App;

