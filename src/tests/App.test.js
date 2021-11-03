import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mocks from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks),
    })
    render(<App/>);
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const characterName =  screen.getByRole('heading', {
      name: /rick sanchez/i
    })
    expect(characterName).toBeDefined();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Buscar'});
    expect(input).toBeDefined();
    expect(button).toBeDefined();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Buscar'});
    userEvent.type(input, 'Smith');
    userEvent.click(button);
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(4);
  })

})
