import { useEffect, useState } from 'react';
import { FilterType, OrderType, TypeResult } from '../types';
import { RootContext } from './ContextApi';
import { GetPlanetStar } from '../utils/ServicesApi';

export function Main({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<TypeResult[]>([]);
  const [filterData, setDataFilter] = useState<TypeResult[]>([]);
  const columnState = ['population', 'diameter', 'orbital_period',
    'rotation_period', 'surface_water'];
  const [columnInfo] = useState(columnState);
  const [nome, setName] = useState('');
  const [filterInputs, setFilterInputs] = useState<FilterType[]>([]);

  const INITIAL_ORDER = {
    order: {
      column: 'population',
      sort: 'ASC',
    },
  };
  const [orderData, setOrderData] = useState<OrderType>(INITIAL_ORDER);

  const changeOrder = (column:string, order:string) => {
    const newOrder = { order: { column, sort: order } };
    setOrderData(newOrder);
  };

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
  useEffect(() => {
    const { column, sort } = orderData.order;
    const recoveredApi = filterData.length > 0 ? filterData : apiData;
    const removedUnknow = recoveredApi.filter((planet) => planet[column] !== 'unknown');

    const sortedApi = removedUnknow.sort((a, b) => {
      switch (sort) {
        case 'ASC':
          return Number(a[column]) - Number(b[column]);
        case 'DESC':
          return Number(b[column]) - Number(a[column]);
        default:
          return 0;
      }
    });
    setApiData([...sortedApi,
      ...apiData.filter((planet) => planet[column] === 'unknown')]);
  }, [orderData.order]);
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
        orderData,
        changeOrder,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
