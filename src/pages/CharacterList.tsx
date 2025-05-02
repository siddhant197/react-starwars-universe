import { useCharacters } from '../hooks/useCharacters';

function CharacterList() {
  const { characters = [], isLoading, error } = useCharacters();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Star Wars Universe</h1>
      {isLoading && <div>Loading characters...</div>}
      {!isLoading && error && <div>{error}</div>}
      {!isLoading && !error && characters.length === 0 && (
        <ul>
          {characters.map((char) => (
            <li key={char.uid} className="mb-2">
              <span className="font-medium">{char.name}</span>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && characters.length > 0 && (
        <ul>
          {characters.map((char) => (
            <li key={char.uid} className="mb-2">
              <span className="font-medium">{char.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CharacterList;
