import { CharacterProperties } from './characters';

export interface CharacterCardProps {
  character: CharacterProperties;
  fields?: (keyof CharacterProperties)[];
  films?: string[];
  starships?: string[];
}

export type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};
