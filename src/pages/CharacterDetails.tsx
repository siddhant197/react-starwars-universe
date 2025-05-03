import { useParams } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CharacterCard from '../components/CharacterCard';

function CharacterDetails() {
  const { id } = useParams();
  const { details, isLoading, error } = useCharacterDetails(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400 drop-shadow-md">
        🌌 Star Wars Universe 🌌
      </h1>
      <h2 className="text-xl text-center font-semibold text-blue-600 mt-8 mb-4 uppercase tracking-wider">
        Character Details
      </h2>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <div className="max-w-md mx-auto mt-10">
          {details && Object.keys(details).length > 0 ? (
            <CharacterCard
              key={details.uid}
              character={details.properties}
              films={details.films}
              starships={details.starships}
              fields={['gender', 'hair_color', 'eye_color', 'homeworld']}
            />
          ) : (
            <p className="text-center text-gray-500 col-span-full">No details found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
