import { useQueries, useQuery } from '@tanstack/react-query';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';
import { fetchCharacterById } from './fetchCharacterById';
import { Character } from '../types/characters';
import { fetchHomePlanet } from './fetchHomePlanet';

export const useCharacterProperties = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
  });
};

export const useAllFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: async (): Promise<FilmResponse[]> => {
      const response = await fetch('https://swapi.tech/api/films/');
      if (!response.ok) throw new Error('Failed to fetch films');
      const { result } = await response.json();
      return result.map((film: { properties: FilmResponse }) => ({
        title: film.properties.title,
        characters: film.properties.characters,
      }));
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useAllStarships = () => {
  return useQuery({
    queryKey: ['starships'],
    queryFn: async (): Promise<StarshipResponse[]> => {
      const response = await fetch('https://swapi.tech/api/starships/?expanded=true');
      if (!response.ok) throw new Error('Failed to fetch starships');
      const { results } = await response.json();
      return results.map((starship: { properties: StarshipResponse }) => ({
        name: starship.properties.name,
        pilots: starship.properties.pilots,
      }));
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useHomeworldQueries = (characterList: Character[]) => {
  return useQueries({
    queries: characterList.map((character) => ({
      queryKey: ['homeworld', character.uid, character.properties.homeworld],
      queryFn: () => fetchHomePlanet(character.properties.homeworld),
      enabled: !!character.properties.homeworld,
      staleTime: 60 * 60 * 1000,
    })),
  });
};
