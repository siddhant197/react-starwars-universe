export interface CharacterProperties {
  name: string;
  gender: string;
  homeworld: string;
  url: string;
  hair_color?: string;
  eye_color?: string;
}

export interface Character {
  uid: string;
  properties: CharacterProperties;
}

export type CharactersResponse = {
  total_records: number;
  total_pages: number;
  results?: Character[] | undefined;
  result?: Character[] | undefined;
};

export interface CharacterDetails extends Character {
  films?: string[];
  starships?: string[];
}
