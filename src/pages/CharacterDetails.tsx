import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CharacterCard from '../components/CharacterCard';

function CharacterDetails() {
  const { id } = useParams();
  const { character, isLoading, error } = useCharacterDetails(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
        Character details
      </h1>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {character && Object.keys(character).length > 0 ? (
            <CharacterCard key={character.uid} character={character.properties} />
          ) : (
            <p className="text-center text-gray-500 col-span-full">No details found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
