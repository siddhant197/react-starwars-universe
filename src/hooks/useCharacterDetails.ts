import { useMemo } from 'react';
import { CharacterDetails } from '../types/characters';
import {
  useAllFilms,
  useAllStarships,
  useCharacterProperties,
  useHomeworldQueries,
} from '../api/queries';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';
import { getErrorMessage } from '../utils/getErrorMessage';

export const useCharacterDetails = (id?: string) => {
  const {
    data: character,
    isLoading: loadingCharacter,
    isFetching: fetchingCharacter,
    error: errorCharacter,
  } = useCharacterProperties(id || '');
  const {
    data: films,
    isLoading: loadingFilms,
    isFetching: fetchingFilms,
    error: errorFilms,
  } = useAllFilms();
  const {
    data: starships,
    isLoading: loadingStarships,
    isFetching: fetchingStarships,
    error: errorStarships,
  } = useAllStarships();
  const homeworldQueries = useHomeworldQueries(character ? [character] : []);
  const isHomeworldLoading = homeworldQueries.some((q) => q.isLoading);
  const isHomeworldFetching = homeworldQueries.some((q) => q.isFetching);

  const isLoading = loadingCharacter || loadingFilms || loadingStarships || isHomeworldLoading;
  const isFetching = fetchingCharacter || fetchingFilms || fetchingStarships || isHomeworldFetching;
  const error =
    getErrorMessage(errorCharacter) ||
    getErrorMessage(errorFilms) ||
    getErrorMessage(errorStarships);

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
      properties: {
        ...character.properties,
        homeworldName: homeworldQueries[0]?.data?.result?.properties?.name ?? 'Unknown',
      },
      films: filteredFilmsTitles,
      starships: filteredStarshipsNames,
    };
  }, [character, films, starships, homeworldQueries]);

  return { details, isLoading, isFetching, error };
};
