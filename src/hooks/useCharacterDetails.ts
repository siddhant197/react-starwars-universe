import { useMemo } from 'react';
import { CharacterDetails } from '../types/characters';
import { useAllFilms, useAllStarships, useCharacterProperties } from '../api/queries';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';

export const useCharacterDetails = (id?: string) => {
  const {
    data: character,
    isLoading: loadingCharacter,
    error: errorCharacter,
  } = useCharacterProperties(id || '');
  const { data: films, isLoading: loadingFilms, error: errorFilms } = useAllFilms();
  const { data: starships, isLoading: loadingStarships, error: errorStarships } = useAllStarships();
  const isLoading = loadingCharacter || loadingFilms || loadingStarships;
  const error = errorCharacter?.message || errorFilms?.message || errorStarships?.message || null;

  const details: CharacterDetails | undefined = useMemo(() => {
    if (!character || !films || !starships) return undefined;

    const characterUrl = character.properties.url;

    const filteredFilmsTitles = films
      .filter((film: FilmResponse) => film.characters.includes(characterUrl))
      .map((film) => film.title);

    const filteredStarshipsNames = starships
      .filter((starship: StarshipResponse) => starship.pilots.includes(characterUrl))
      .map((starship) => starship.name);

    return {
      uid: character.uid,
      properties: character.properties,
      films: filteredFilmsTitles,
      starships: filteredStarshipsNames,
    };
  }, [character, films, starships]);

  return { details, isLoading, error };
};
