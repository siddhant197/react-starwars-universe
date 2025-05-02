import { CharacterCardProps } from '../types/characters';

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{character.name}</h3>
      <p className="text-sm">Gender: {}</p>
      <p className="text-sm">Home Planet: {}</p>
    </div>
  );
}

export default CharacterCard;
