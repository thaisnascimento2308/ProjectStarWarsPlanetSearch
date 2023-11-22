import { useEffect, useState } from 'react';
import { FilterType, TypeResult } from '../types';
import { RootContext } from './ContextApi';
import { GetPlanetStar } from '../utils/ServicesApi';

export function Main({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<TypeResult[]>([]);
  const [filterData, setDataFilter] = useState<TypeResult[]>([]);

  const [nome, setName] = useState('');

  const INITIAL_FILTER_INPUTS = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [filterInputs, setFilterInputs] = useState<FilterType>(INITIAL_FILTER_INPUTS);

  useEffect(() => {
    const fetchData = async () => {
      const recoveredFetch: TypeResult[] = await GetPlanetStar();
      getApi(recoveredFetch);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (nome.length === 0) setDataFilter(apiData);
    const formatedApi = apiData
      .filter((planet) => planet.name.toLowerCase().includes(nome.toLowerCase()));
    setDataFilter(formatedApi);
  }, [nome, apiData]);

  const getApi = (data: TypeResult[]) => {
    setApiData(data);
  };

  const filterApiByInputs = (
    api: TypeResult[],
    { column, comparison, value } = INITIAL_FILTER_INPUTS,
  ) => {
    switch (comparison) {
      case 'maior que':
        return setDataFilter(api
          .filter((planet) => Number(planet[column]) > Number(value)));
      case 'menor que':
        return setDataFilter(api
          .filter((planet) => Number(planet[column]) < Number(value)));
      case 'igual a':
        return setDataFilter(api
          .filter((planet) => Number(planet[column]) === Number(value)));
      default:
        return setDataFilter(api);
    }
  };

  return (
    <RootContext.Provider
      value={ {
        apiData,
        getApi,
        filterData,
        filterInputs,
        setFilterInputs,
        nome,
        setName,
        filterApiByInputs,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
