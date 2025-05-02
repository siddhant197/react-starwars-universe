import { CharacterCardProps } from '../types/props';

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{character.name}</h3>
      <p className="text-sm">Gender: {character.gender}</p>
      <p className="text-sm">Home Planet: {character.homeworld}</p>
    </div>
  );
}

export default CharacterCard;
