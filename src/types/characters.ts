export interface Character {
  uid: string;
  name: string;
  url: string;
}

export type CharactersResponse = {
  next: string | null;
  previous: string | null;
  total_records: number;
  total_pages: number;
  results: Character[];
};
