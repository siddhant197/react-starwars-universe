import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CharacterCard from '../components/CharacterCard';
import { useFavoriteCharacters } from '../hooks/useFavoriteCharacters';

function FavoritesList() {
  const { characters, isLoading, error } = useFavoriteCharacters();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
        🌌 Star Wars Universe 🌌
      </h1>
      <h2 className="text-xl text-center font-semibold text-blue-600 mt-8 mb-4 uppercase tracking-wider">
        Your Favorites
      </h2>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.length > 0 ? (
            characters.map((character) => (
              <div key={character.uid} className="relative group">
                <CharacterCard
                  key={character.uid}
                  character={character.properties}
                  fields={['height', 'gender', 'homeworld']}
                />
                <button
                  onClick={() => {}}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded transition-opacity group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No favorites added yet!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;
