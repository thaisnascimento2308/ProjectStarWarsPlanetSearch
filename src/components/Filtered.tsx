import { useContext, useEffect, useState } from 'react';
import { RootContext } from '../context/ContextApi';
import { FilterType } from '../types';

export function Filter() {
  const INITIAL_FILTER_INPUTS = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };
  const INITIAL_ORDER = {
    column: 'population',
    sort: 'ASC',
  };

  const { nome, setName, columnInfo, changeOrder,
    filterInputs, setFilterInputs } = useContext(RootContext);
  const [checkFilters, setCheckFilters] = useState(false);
  const [columnData, setColumnData] = useState(columnInfo);
  const [inputData, setInputData] = useState<FilterType>(INITIAL_FILTER_INPUTS);
  const [orderInfo, setOrderInfo] = useState(INITIAL_ORDER);
  const comparisonData = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    if (filterInputs.length > 0) setCheckFilters(true);
    else setCheckFilters(false);
  }, [filterInputs]);

  const validateInputs = (data:string) => {
    setColumnData(columnData.filter((column) => column !== data));
  };

  function handleChange(
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = target;
    setInputData({ ...inputData, [name]: value });
    console.log(inputData);
  }
  const handleClick = () => {
    const { column } = inputData;
    validateInputs(column);
    setFilterInputs([...filterInputs, inputData]);
    setInputData(INITIAL_FILTER_INPUTS);
  };

  function handleRemoveInput(data: string) {
    setFilterInputs(filterInputs.filter((input) => input.column !== data));
    const recoverColumn = columnInfo.find((column) => column === data);
    setColumnData([...columnData, recoverColumn as string]);
  }

  function handleRemoveAllFilters() {
    setFilterInputs([]);
    setColumnData(columnInfo);
  }
  const setOrder = (column:string, sort:string) => {
    changeOrder(column, sort);
  };

  const changeInputOrder = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  return (
    <>
      <label htmlFor="name">Filtrar por nome</label>
      <input
        type="text"
        id="name"
        name="nome"
        onChange={ ({ target }) => setName(target.value) }
        value={ nome }
        data-testid="name-filter"
      />

      <select
        name="column"
        onChange={ (event) => handleChange(event) }
        data-testid="column-filter"
      >
        { columnData.map((column) => (
          <option
            key={ column }
            value={ column }
          >
            { column }

          </option>)) }
      </select>

      <select
        onChange={ (event) => handleChange(event) }
        name="comparison"
        data-testid="comparison-filter"
      >
        { comparisonData.map((comparison) => (
          <option key={ comparison } value={ comparison }>{ comparison }</option>))}
      </select>

      <input
        type="number"
        name="value"
        value={ inputData.value }
        onChange={ (event) => handleChange(event) }
        data-testid="value-filter"
      />
      <select
        data-testid="column-sort"
        name="column"
        onChange={ (event) => changeInputOrder(event) }
      >
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation period</option>
        <option value="surface_water">Surface Water</option>
      </select>

      <label htmlFor="asc">Ascendente</label>
      <input
        type="radio"
        name="sort"
        value="ASC"
        onChange={ (event) => changeInputOrder(event) }
        data-testid="column-sort-input-asc"
        id="asc"
      />

      <label htmlFor="desc">Descendente</label>
      <input
        type="radio"
        name="sort"
        value="DESC"
        onChange={ (event) => changeInputOrder(event) }
        data-testid="column-sort-input-desc"
        id="desc"
      />

      <button
        onClick={ () => setOrder(orderInfo.column, orderInfo.sort) }
        data-testid="column-sort-button"
      >
        Ajustar ordenação

      </button>
      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Adicionar filtro

      </button>
      { checkFilters && filterInputs.map((input) => (
        <div key={ input.value } data-testid="filter">
          <p aria-label="filter-text">
            {`${input.column} ${input.comparison} ${input.value}`}
          </p>
          <button
            onClick={ () => handleRemoveInput(input.column) }
          >
            Remove um filtro
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover todos filtros
      </button>
    </>

  );
}

export default Filter;
