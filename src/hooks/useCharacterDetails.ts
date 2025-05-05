import { useMemo } from 'react';
import { CharacterDetails } from '../types/characters';
import {
  useAllFilms,
  useAllStarships,
  useCharacterProperties,
  useHomeplanets,
} from '../api/queries';
import { FilmResponse } from '../types/films';
import { StarshipResponse } from '../types/starships';
import { getErrorMessage } from '../utils/getErrorMessage';
import { HomeplanetResponse } from '../types/homeplanets';

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
  const {
    data: homeplanets,
    isLoading: loadingHomeplanets,
    isFetching: fetchingHomeplanets,
    error: errorHomeplanets,
  } = useHomeplanets();

  const isLoading = loadingCharacter || loadingFilms || loadingStarships || loadingHomeplanets;
  const isFetching = fetchingCharacter || fetchingFilms || fetchingStarships || fetchingHomeplanets;
  const error =
    getErrorMessage(errorCharacter) ||
    getErrorMessage(errorFilms) ||
    getErrorMessage(errorStarships) ||
    getErrorMessage(errorHomeplanets);

  const details: CharacterDetails | undefined = useMemo(() => {
    if (!character || !films || !starships) return undefined;

    const characterUrl = character.properties.url;

    const filteredFilmsTitles = films
      .filter((film: FilmResponse) => film.characters.includes(characterUrl))
      .map((film) => film.title);

    const filteredStarshipsNames = starships
      .filter((starship: StarshipResponse) => starship.pilots.includes(characterUrl))
      .map((starship) => starship.name);

    const filteredHomeworld = homeplanets?.find(
      (homeplanet: HomeplanetResponse) => homeplanet.url === character.properties.homeworld
    );

    return {
      uid: character.uid,
      properties: {
        ...character.properties,
        homeworldName: filteredHomeworld?.name ?? 'Unknown',
      },
      films: filteredFilmsTitles,
      starships: filteredStarshipsNames,
    };
  }, [character, films, homeplanets, starships]);

  return { details, isLoading, isFetching, error };
};
