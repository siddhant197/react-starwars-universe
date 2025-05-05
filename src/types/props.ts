import { CharacterProperties } from './characters';

export interface CharacterCardProps {
  uid?: string;
  character?: CharacterProperties;
  fields?: (keyof CharacterProperties)[];
  films?: string[];
  starships?: string[];
  editable?: string[];
  onEdit?: (id: string, field: string, value: string) => void;
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

export type HeaderProps = {
  heading?: string;
  subheading?: string;
};
