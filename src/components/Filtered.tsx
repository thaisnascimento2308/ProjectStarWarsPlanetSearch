import { useContext, useState } from 'react';
import { RootContext } from '../context/ContextApi';
import { FilterType } from '../types';

export function Filter() {
  const { nome, setName, filterData,
    setFilterInputs, filterApiByInputs } = useContext(RootContext);

  const columnData = ['population', 'diameter', 'orbital_period',
    'rotation_period', 'surface_water'];

  const comparisonData = ['maior que', 'menor que', 'igual a'];

  const INITIAL_FILTER_INPUTS = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  const [inputData, setInputData] = useState<FilterType>(INITIAL_FILTER_INPUTS);

  function handleChange(
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = target;
    setInputData({ ...inputData, [name]: value });
    console.log(inputData);
  }

  const handleClick = () => {
    setFilterInputs(inputData);
    filterApiByInputs(filterData, inputData);
  };

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
          <option key={ column } value={ column }>{ column }</option>)) }
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
    </>

  );
}

export default Filter;
