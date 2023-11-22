import { TypePlanet } from '../types';

export async function GetPlanetStar() {
  const responseURL = await fetch('https://swapi.dev/api/planets');
  const data:TypePlanet = await responseURL.json();
  data.results.map((result) => {
    if ('residents' in result) delete result.residents;
    return result;
  });
  return data.results;
}
