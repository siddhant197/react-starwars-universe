import { CharacterDetails } from '../types/characters';

export const fetchCharacterDetails = async (id: string): Promise<CharacterDetails> => {
  try {
    const response = await fetch(`https://swapi.tech/api/people/${id}`);
    if (!response.ok) throw new Error('Failed to fetch characters');

    const data: CharacterDetails = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch character data.');
  }
};
