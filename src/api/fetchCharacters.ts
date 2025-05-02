import { CharactersResponse } from '../types/characters';

export const fetchCharacters = async (): Promise<CharactersResponse> => {
  try {
    const response = await fetch(`https://swapi.tech/api/people`);
    if (!response.ok) throw new Error('Failed to fetch characters');

    const data: CharactersResponse = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch character data.');
  }
};
