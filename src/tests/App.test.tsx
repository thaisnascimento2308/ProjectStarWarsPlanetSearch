import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import App from '../App';
import { Main } from '../context/ContextMain';
import { Filter } from '../components/Filtered';

describe('Teste do componente <App />', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Verifica se o formulário de pesquisa é renderizado na tela', () => {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });

  it('Verifica se a tabela é renderizada na tela', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('Verifica se a tabela contém os valores corretos', () => {
    const columnHeaders = [
      'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
    ];

    columnHeaders.forEach((header) => {
      expect(screen.getByRole('table')).toHaveTextContent(header);
    });
  });
});

describe('Testes para o componente <Filter />', () => {
    render(
      <Main>
        <Filter />
      </Main>
    );
  
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
  });

  it('deve adicionar um filtro corretamente', async () => {
    render(
      <Main>
        <Filter />
      </Main>
    );

    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000000' } });
    fireEvent.click(screen.getByTestId('button-filter'));

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toBeInTheDocument();
      expect(screen.getByText('population maior que 1000000')).toBeInTheDocument();
    });
  });

  it('deve remover um filtro corretamente', async () => {
    render(
      <Main>
        <Filter />
      </Main>
    );

    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000000' } });
    fireEvent.click(screen.getByTestId('button-filter'));

    fireEvent.click(screen.getByText('Remove um filtro'));

    expect(screen.queryByTestId('filter')).toBeNull();
  });

  it('deve remover todos os filtros corretamente', async () => {
    render(
      <Main>
        <Filter />
      </Main>
    );

    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000000' } });
    fireEvent.click(screen.getByTestId('button-filter'));

    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'diameter' } });
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'menor que' } });
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '5000' } });
    fireEvent.click(screen.getByTestId('button-filter'));

    fireEvent.click(screen.getByTestId('button-remove-filters'));

    expect(screen.queryByTestId('filter')).toBeNull();
  });
