import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import ApiContextResponse from './context/ContextApi';
import getPlanets from './services/ServicesApi';
import { Planet } from './types';

function App() {
  const [planets, setPlanets] = useState<Planet[] | null>(null);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const planetsData = await getPlanets();
        setPlanets(planetsData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlanets();
  }, []);

  return (
    <ApiContextResponse.Provider value={ { data: planets || [] } }>
      <div>
        <Table />
      </div>
    </ApiContextResponse.Provider>
  );
}

export default App;
