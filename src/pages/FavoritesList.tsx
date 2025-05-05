import CharacterCard from '../components/CharacterCard';
import { useRemoveFavorite, useUpdateFavorite } from '../hooks/useFavorites';
import { useFavorites } from '../context/FavoritesContext';
import PageTitle from '../components/PageTitle';

function FavoritesList() {
  const { state } = useFavorites();
  const { favorites } = state;
  const removeFavorite = useRemoveFavorite();
  const updateFavorite = useUpdateFavorite();

  const handleUpdateFavorite = (uid: string, field: string, value: string) => {
    console.log({
      [field]: value,
    });
    updateFavorite(uid, {
      [field]: value,
    });
  };

  const handleRemoveFavorite = (uid: string) => {
    if (!uid) return;
    removeFavorite(uid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <PageTitle heading="List of your Favorite Characters" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((character) => (
            <div key={character.uid} className="relative group">
              <CharacterCard
                key={character.uid}
                uid={character.uid}
                character={character.properties}
                editable={['gender', 'height']}
                onEdit={handleUpdateFavorite}
                fields={['height', 'gender', 'homeworldName']}
              />
              <button
                onClick={() => handleRemoveFavorite(character.uid || '')}
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
    </div>
  );
}

export default FavoritesList;
