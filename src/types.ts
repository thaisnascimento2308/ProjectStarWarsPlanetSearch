export type TypePlanet = { results: [{ name: string }] };

export type TypeResult = { [y:string]: string | string[], name: string };

export type FilterType = {
  column: string,
  comparison: string,
  value: string,
};
