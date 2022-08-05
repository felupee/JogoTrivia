import React from 'react';
import { screen } from '@testing-library/react'
import App from '../../App';
import userEvent from '@testing-library/user-event';
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

    test.only('Verifica se a pagina é redirecionada' , () => {
        const { history } = renderWithRouter(<App />);
        const nameField = screen.getByTestId('input-player-name');
        const emailField = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play')


        
        /* expect(playButton).toBeDisabled(); */
        console.log(userEvent)
        userEvent.type(nameField, 'Coringa');
        const name = screen.getByText('Coringa')
        expect(name).toBeInTheDocument();
        /* userEvent.click(playButton); */
        /* const { location: {pathname}  } = history; */
        /* expect(pathname).toBe('/game'); */
        /* const gameTitle = screen.findByText('Game');
        console.log(gameTitle);
        expect(gameTitle).toBeInTheDocument(); */
        
        
    })
}) 