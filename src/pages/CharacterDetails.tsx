import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CharacterCard from '../components/CharacterCard';
import { useAddFavorite, useRemoveFavorite } from '../hooks/useFavorites';
import { useFavorites } from '../context/FavoritesContext';
import PageTitle from '../components/PageTitle';

function CharacterDetails() {
  const { id = '' } = useParams();
  const { state } = useFavorites();
  const { favorites } = state;
  const { details, isLoading, isFetching, error } = useCharacterDetails(id);
  const addFavorite = useAddFavorite();
  const removeFromFavorite = useRemoveFavorite();

  const handleaddFavorite = () => {
    if (!id) return;
    addFavorite({
      uid: details?.uid,
      properties: details?.properties,
    });
  };

  const handleRemoveFavorite = () => {
    if (!id) return;
    removeFromFavorite(id);
  };

  const isFavorite = favorites.some((character) => character.uid === id);
  const isFetched = !isLoading && !isFetching && !error;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <PageTitle heading="character details" />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {isFetched && (
        <div className="max-w-md mx-auto mt-10">
          {details && Object.keys(details).length > 0 ? (
            <>
              <CharacterCard
                uid={details.uid}
                key={details.uid}
                character={details.properties}
                films={details.films}
                starships={details.starships}
                fields={['gender', 'hair_color', 'eye_color', 'homeworldName']}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={isFavorite ? handleRemoveFavorite : handleaddFavorite}
                  className={`w-full px-4 py-2 rounded-md transition-colors duration-300 font-semibold
      ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-400 hover:bg-yellow-500'}
      text-black shadow-lg`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 col-span-full">No details found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
