import { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { useCharacters } from '../hooks/useCharacters';
import Pagination from '../components/Pagination';

function CharacterList() {
  const limit = 12;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(1);
  const { characters, isLoading, error, totalPages } = useCharacters(searchTerm, page, limit);

  const searchCharacter = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
        🌌 Star Wars Universe 🌌
      </h1>
      <SearchBar search={searchTerm} onSearchChange={(value) => searchCharacter(value)} />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => (
              <CharacterCard key={character.uid} character={character.properties} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No characters found.</p>
          )}
        </div>
      )}

      {!isLoading && !error && characters.length > 0 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}

export default CharacterList;
