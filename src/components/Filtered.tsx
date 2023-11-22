import { useContext, useEffect, useState } from 'react';
import { RootContext } from '../context/ContextApi';
import { FilterType } from '../types';

export function Filter() {
  const INITIAL_FILTER_INPUTS = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };
  const { nome, setName, columnInfo, apiData,
    filterInputs, setFilterInputs } = useContext(RootContext);
  const [checkFilters, setCheckFilters] = useState(false);
  const [columnData, setColumnData] = useState(columnInfo);
  const [inputData, setInputData] = useState<FilterType>(INITIAL_FILTER_INPUTS);

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

  return (
    <>
      <input
        type="text"
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

      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Adicionar filtro

      </button>
      { checkFilters && filterInputs.map((input) => (
        <div key={ input.value } data-testid="filter">
          <p>
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
