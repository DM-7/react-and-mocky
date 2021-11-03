import { render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from '../tests/mocks';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    })

    render(<App />)
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const title = screen.getByRole('heading', {
      level: 3,
      name: /rick sanchez/i,
    })
    expect(title).toBeDefined();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const button = screen.getByRole('button', { name: /buscar/i })
    const input = screen.getByRole('textbox')
    expect(button).toBeDefined();
    expect(input).toBeDefined();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const button = screen.getByRole('button', { name: /buscar/i })
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'smith');
    userEvent.click(button);
    const articles = screen.getAllByRole('article');
    const numberOfCards = 4;
    expect(articles).toHaveLength(numberOfCards);
  })

})
