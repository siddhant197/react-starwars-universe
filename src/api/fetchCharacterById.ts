import { Character } from '../types/characters';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${baseUrl}/people/${id}`);
  if (!response.ok) throw new Error('Failed to fetch character details');
  const { result } = await response.json();
  return {
    uid: result.uid,
    properties: result.properties,
  };
};
