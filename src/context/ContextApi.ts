import { createContext } from 'react';
import { FilterType, TypeResult, ColumnDataType, OrderType } from '../types';

export type ContextType = {
  apiData: TypeResult[],
  getApi: (data: TypeResult[]) => void,
  filterData: TypeResult[],
  filterInputs: FilterType[],
  setFilterInputs: React.Dispatch<React.SetStateAction<FilterType[]>>,
  nome: string,
  setName: React.Dispatch<React.SetStateAction<string>>
  columnInfo: ColumnDataType,
  orderData: OrderType,
  changeOrder: (column:string, order:string) => void,
};

export const RootContext = createContext<ContextType>({} as ContextType);
