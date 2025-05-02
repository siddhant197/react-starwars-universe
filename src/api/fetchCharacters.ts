export type Character = {
  name: string;
  uid: string;
  url: string;
};

export type CharactersResponse = {
  next: string | null;
  previous: string | null;
  total_records: number;
  total_pages: number;
  results: Character[];
};

export const fetchCharacters = async (): Promise<CharactersResponse | unknown> => {
  try {
    const response = await fetch(`https://swapi.tech/api/people`);
    if (!response.ok) throw new Error('Failed to fetch characters');

    const data: CharactersResponse = await response.json();
    return data;
  } catch (error: unknown) {
    console.error('Character fetch failed:', error);
    throw new Error('Failed to fetch character data.');
  }
};
