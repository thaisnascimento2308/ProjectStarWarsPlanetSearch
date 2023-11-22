import { useEffect, useState } from 'react';
import { FilterType, TypeResult } from '../types';
import { RootContext } from './ContextApi';
import { GetPlanetStar } from '../utils/ServicesApi';

export function Main({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<TypeResult[]>([]);
  const [filterData, setDataFilter] = useState<TypeResult[]>([]);
  const columnState = ['population', 'diameter', 'orbital_period',
    'rotation_period', 'surface_water'];

  const [columnInfo] = useState(columnState);
  const [nome, setName] = useState('');

  const INITIAL_FILTER_INPUTS = {
    column: '',
    comparison: '',
    value: '',
  };

  const [filterInputs, setFilterInputs] = useState<FilterType[]>([]);

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
  useEffect(() => {
    const adjustApiData = () => {
      const apiSave = apiData.filter((planet) => (
        filterInputs.every(({ column, comparison, value }) => {
          switch (comparison) {
            case 'maior que':
              return Number(planet[column]) > Number(value);
            case 'menor que':
              return Number(planet[column]) < Number(value);
            case 'igual a':
              return Number(planet[column]) === Number(value);
            default:
              return planet;
          }
        })
      ));
      setDataFilter(apiSave);
    };
    adjustApiData();
  }, [filterInputs]);

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
        columnInfo,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
