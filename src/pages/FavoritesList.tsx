import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CharacterCard from '../components/CharacterCard';
import { useFavoriteCharacters } from '../hooks/useFavoriteCharacters';
import { useRemoveFavorite } from '../hooks/useFavorites';
import Header from '../components/Header';

function FavoritesList() {
  const { characters, isLoading, error } = useFavoriteCharacters();
  const removeFromFavorite = useRemoveFavorite();

  const handleRemoveFavorite = (uid: string) => {
    removeFromFavorite(uid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <Header heading="star wars universe" subheading="explore the galaxy" />
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
                  onClick={() => handleRemoveFavorite(character.uid)}
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
