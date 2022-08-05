import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from './renderWithRouter';

describe('Testa pagina de login', () => {
    test('Testa se renderiza a rota correta', () => {
        const { history } = renderWithRouter(<App />)
        const { location: {pathname}  } = history;
        expect(pathname).toBe('/');
    })

    test('Verifica se os elementos foram renderizados corretamente', () => {
        renderWithRouter(<App />);
        const nameField = screen.getByTestId('input-player-name');
        const emailField = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play')
        const settingsButton = screen.getByTestId('btn-settings')

        expect(nameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(playButton).toBeInTheDocument();
        expect(settingsButton).toBeInTheDocument();
    })

    test('Verifica se a pagina é redirecionada' , async() => {
        const { history } = renderWithRouter(<App />);
        const nameField = screen.getByTestId('input-player-name');
        const emailField = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play')

        userEvent.type(nameField, 'Coringa');

        expect(nameField.value).toBe('Coringa');
        userEvent.type(emailField, 'teste@teste.com'); 
        expect(emailField.value).toBe('teste@teste.com')
        userEvent.click(playButton)

        const gameTitle = await screen.findByText('Game');
        const { location: {pathname}  } = history;
        expect(pathname).toBe('/game'); 
       expect(gameTitle).toBeInTheDocument(); 
       
    })

    test('Verifica se a pagina settings é redirecionada', ()=>{
        const { history } = renderWithRouter(<App />);
        const settingsButton = screen.getByTestId('btn-settings')
        userEvent.click(settingsButton)
        
        const { location: {pathname}  } = history;

        expect(pathname).toBe('/settings'); 

    })
}) 

