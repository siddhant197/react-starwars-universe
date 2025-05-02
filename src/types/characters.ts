export interface CharacterProperties {
  name: string;
  gender: string;
  homeworld: string;
  url: string;
}

export interface Character {
  uid: string;
  properties: CharacterProperties;
}

export type CharactersResponse = {
  next: string | null;
  previous: string | null;
  total_records: number;
  total_pages: number;
  results: Character[] | undefined;
  result: Character[] | undefined;
};
