import { useContext } from 'react';
import { Filter } from './Filtered';
import { RootContext } from '../context/ContextApi';

let id = 0;

function Table() {
  const { filterData } = useContext(RootContext);

  const listPlanet = filterData.map((world) => (
    <tr key={ id++ }>
      <td>{world.name}</td>
      <td data-testid="planet-name">{world.name}</td>
      <td data-testid="rotation">{world.rotation_period}</td>
      <td data-testid="orbital">{world.orbital_period}</td>
      <td data-testid="diameter">{world.diameter}</td>
      <td data-testid="climate">{world.climate}</td>
      <td data-testid="gravity">{world.gravity}</td>
      <td data-testid="terrain">{world.terrain}</td>
      <td data-testid="surface_water">{world.surface_water}</td>
      <td data-testid="population">{world.population}</td>
      <td data-testid="films">{world.films}</td>
      <td data-testid="created">{world.created}</td>
      <td data-testid="edited">{world.edited}</td>
      <td data-testid="url">{world.url}</td>
    </tr>
  ));

  return (
    <>
      <Filter />
      <table>
        <thead aria-label="thead">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody aria-label="tbody">
          { listPlanet }
        </tbody>
      </table>
    </>
  );
}
export default Table;
