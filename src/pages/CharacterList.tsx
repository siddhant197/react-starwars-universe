import { useState } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { useCharacters } from '../hooks/useCharacters';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

function CharacterList() {
  const limit = 12;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(1);
  const { characters, isLoading, error, totalPages, isFetching } = useCharacters(
    searchTerm,
    page,
    limit
  );

  const searchCharacter = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const isFetched = !isLoading && !isFetching && !error;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <Header heading="star wars universe" subheading="explore the galaxy" />
      <SearchBar search={searchTerm} onSearchChange={(value) => searchCharacter(value)} />
      {(isLoading || isFetching) && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {isFetched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => {
              return (
                <Link
                  to={`/character/${character.uid}`}
                  key={character.uid}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <CharacterCard
                    character={character.properties}
                    fields={['gender', 'homeworldName']}
                  />
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-full">No characters found.</p>
          )}
        </div>
      )}

      {isFetched && characters.length > 0 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}

export default CharacterList;
