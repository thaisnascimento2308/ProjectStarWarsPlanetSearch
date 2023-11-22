import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import {vi} from 'vitest'

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