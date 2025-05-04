import { Character } from '../types/characters';

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`https://swapi.tech/api/people/${id}`);
  if (!response.ok) throw new Error('Failed to fetch character details');
  const { result } = await response.json();
  return {
    uid: result.uid,
    properties: result.properties,
  };
};
