import { useContext, useEffect, useState } from 'react';
import ApiContextResponse from '../context/ContextApi';
import Table from './Table';
import { useFilter, optionFilter } from '../services/Hook';
import { Planet } from '../types';

const option1 = 'population';
const operator = 'maior que';

function Filter() {
  const planets = useContext(ApiContextResponse).data;
  const [bringText, useText] = useState('');
  const [value, setValue] = useState(0);
  const [finalResults, setFinalResults] = useState([]);

  const Items = 'name';

  const filterResult = useFilter(bringText, Items, planets);
  const optionFilterResults = optionFilter(option1, operator, value, planets);

  useEffect(() => {
    setFinalResults(filterResult);
  }, [filterResult]);

  const HandleChange = (event: any) => {
    useText(event.target.value);
    setFinalResults(filterResult);
  };

  const HandleNumber = (event: any) => {
    setValue(event.target.value);
  };

  const HandleColun = (event: any) => {
    option1 = event.target.value;
  };

  const HandleOperator = (event: any) => {
    operator = event.target.value;
  };

  function HandleClick() {
    setFinalResults(optionFilterResults);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="value"
          id="search"
          data-testid="name-filter"
          onChange={ HandleChange }
        />
      </div>
      <div className="filter">
        <div className="filter__sort">
          <p>Coluna</p>
          <select
            name="sort"
            id="sort"
            onChange={ HandleColun }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </div>
        <div className="filter__size">
          <p>Operador</p>
          <select
            name="size"
            id="size"
            onChange={ HandleOperator }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <div>
          <p>Valor</p>
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-filter"
            onChange={ HandleNumber }
            value={ value }
          />
        </div>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ HandleClick }
        >
          FILTRAR
        </button>
      </div>
      <Table filterResult={ finalResults as Planet[] } />
    </div>
  );
}
export default Filter;
