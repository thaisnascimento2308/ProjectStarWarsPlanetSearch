export type TypePlanet = { results: [{ name: string }] };
export type ColumnDataType = string[];
export type TypeResult = { [y:string]: string | string[], name: string };
export type OrderType = {
  order: { [z:string]: string }
};
export type FilterType = {
  column: string,
  comparison: string,
  value: string,
};
