import { useContext } from 'react';
import { Filter } from './Filtered';
import { RootContext } from '../context/ContextApi';

let id = 0;

function Table() {
  const { filterData } = useContext(RootContext);

  const listPlanet = filterData.map((world) => (
    <tr key={ id++ }>
      <td>{world.name}</td>
      <td>{world.rotation_period}</td>
      <td>{world.orbital_period}</td>
      <td>{world.diameter}</td>
      <td>{world.climate}</td>
      <td>{world.gravity}</td>
      <td>{world.terrain}</td>
      <td>{world.surface_water}</td>
      <td>{world.population}</td>
      <td>{world.films}</td>
      <td>{world.created}</td>
      <td>{world.edited}</td>
      <td>{world.url}</td>
    </tr>
  ));

  return (
    <>
      <Filter />
      <table>
        <thead>
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
        <tbody>
          { listPlanet }
        </tbody>
      </table>
    </>
  );
}
export default Table;
