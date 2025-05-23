import { CharacterCardProps } from '../types/props';
import { fieldLabels } from '../constants/characterFieldLabels';

function CharacterCard({
  uid,
  character,
  fields = [],
  films = [],
  starships = [],
  editable = [],
  onEdit,
}: CharacterCardProps) {
  const isEditable = (field: string) => editable.includes(field);

  return (
    <div className="transition border border-gray-700 duration-200 ease-in-out hover:border-black hover:bg-gray-800 hover:shadow-md hover:scale-[1.02] cursor-pointer rounded-lg p-4">
      <h3 className="text-2xl font-bold text-gray-50 mb-6 border-l-4 border-amber-400 pl-3 glow">
        {character.name}
      </h3>

      <div className="space-y-4 text-gray-300">
        {fields.map((field) => (
          <div className="flex items-stretch" key={field}>
            <span className="w-32 text-lg font-medium text-gray-400">{fieldLabels[field]}:</span>
            {isEditable(field) && onEdit ? (
              <input
                className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
                type="text"
                value={character[field] || ''}
                onChange={(e) => onEdit(uid, field, e.target.value)}
              />
            ) : (
              <span className="text-gray-100">{character[field]}</span>
            )}
          </div>
        ))}
        {films.length > 0 && (
          <div className="flex items-stretch" key="films">
            <span className="w-32 text-lg font-medium text-gray-400">Films:</span>
            <span className="text-gray-100">{films.join(', ')}</span>
          </div>
        )}
        {starships.length > 0 && (
          <div className="flex items-stretch" key="starships">
            <span className="w-32 text-lg font-medium text-gray-400">Starships:</span>
            <span className="text-gray-100">{starships.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
