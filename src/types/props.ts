import { CharacterProperties } from './characters';

export interface CharacterCardProps {
  character: CharacterProperties;
}

export type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};
