import { CharactersResponse } from '../types/characters';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchCharacters = async (
  search: string = '',
  page: number = 1,
  pageSize: number = 10
): Promise<CharactersResponse> => {
  try {
    const response = await fetch(
      `${baseUrl}/people/?expanded=true&name=${search}&page=${page}&limit=${pageSize}`
    );
    if (!response.ok) throw new Error('Failed to fetch characters');

    const data: CharactersResponse = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch character data.');
  }
};
