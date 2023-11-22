import { createContext } from 'react';
import { FilterType, TypeResult, ColumnDataType } from '../types';

export type ContextType = {
  apiData: TypeResult[],
  getApi: (data: TypeResult[]) => void,
  filterData: TypeResult[],
  filterInputs: FilterType[],
  setFilterInputs: React.Dispatch<React.SetStateAction<FilterType[]>>,
  nome: string,
  setName: React.Dispatch<React.SetStateAction<string>>
  columnInfo: ColumnDataType
};

export const RootContext = createContext<ContextType>({} as ContextType);
