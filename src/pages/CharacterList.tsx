import CharacterCard from '../components/CharacterCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCharacters } from '../hooks/useCharacters';

function CharacterList() {
  const { characters = [], isLoading, error } = useCharacters();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
        🌌 Star Wars Universe 🌌
      </h1>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No characters found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
