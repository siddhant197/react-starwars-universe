import { useQuery } from '@tanstack/react-query';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';
import { Character } from '../types/characters';

export const useCharacterProperties = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async (): Promise<Character> => {
      const response = await fetch(`https://swapi.tech/api/people/${id}`);
      if (!response.ok) throw new Error('Failed to fetch character details');
      const { result } = await response.json();
      return {
        uid: result.uid,
        properties: result.properties,
      };
    },
    enabled: !!id,
    staleTime: Infinity,
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
    staleTime: Infinity,
  });
};

export const useAllStarships = () => {
  return useQuery({
    queryKey: ['starships'],
    queryFn: async (): Promise<StarshipResponse[]> => {
      const res = await fetch('https://swapi.tech/api/starships/?expanded=true');
      if (!res.ok) throw new Error('Failed to fetch starships');
      const { results } = await res.json();
      return results.map((starship: { properties: StarshipResponse }) => ({
        name: starship.properties.name,
        pilots: starship.properties.pilots,
      }));
    },
    staleTime: Infinity,
  });
};
