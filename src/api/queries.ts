import { QueryClient, useQuery } from '@tanstack/react-query';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';
import { fetchCharacterById } from './fetchCharacterById';
import { HomeplanetResponse } from '../types/homeplanets';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const queryClient = new QueryClient();

export const useCharacterProperties = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    initialData: () => {
      const allCharacters = queryClient
        .getQueriesData({ queryKey: ['characters'] })
        .flatMap(([, data]) => data?.results ?? []);

      return allCharacters.find((char) => char.uid === id);
    },
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useAllFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: async (): Promise<FilmResponse[]> => {
      const response = await fetch(`${baseUrl}/films/`);
      if (!response.ok) throw new Error('Failed to fetch films');
      const { result } = await response.json();
      return result.map((film: { properties: FilmResponse }) => ({
        title: film.properties.title,
        characters: film.properties.characters,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useAllStarships = () => {
  return useQuery({
    queryKey: ['starships'],
    queryFn: async (): Promise<StarshipResponse[]> => {
      const response = await fetch(`${baseUrl}/starships/?expanded=true`);
      if (!response.ok) throw new Error('Failed to fetch starships');
      const { results } = await response.json();
      return results.map((starship: { properties: StarshipResponse }) => ({
        name: starship.properties.name,
        pilots: starship.properties.pilots,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useHomeplanets = () => {
  return useQuery({
    queryKey: ['homeplanets'],
    queryFn: async (): Promise<HomeplanetResponse[]> => {
      const response = await fetch(`${baseUrl}/planets/`);
      if (!response.ok) throw new Error('Failed to fetch planets');
      const { results } = await response.json();
      return results.map((planet: HomeplanetResponse) => ({
        name: planet.name,
        url: planet.url,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
};
