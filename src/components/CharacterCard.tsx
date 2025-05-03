import { CharacterCardProps } from '../types/props';

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="transition border border-gray-700 duration-200 ease-in-out hover:border-black hover:bg-gray-800 hover:shadow-md hover:scale-[1.02] cursor-pointer rounded-lg p-4">
      <h3 className="text-xl font-semibold">{character.name}</h3>
      <p className="text-sm">Gender: {character.gender}</p>
      <p className="text-sm">Home Planet: {character.homeworld}</p>
    </div>
  );
}

export default CharacterCard;
