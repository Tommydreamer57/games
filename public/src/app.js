import React from 'react';
import { createSwitch } from './mitosis-router';
// VIEWS
import createLanding from './views/landing/landing';
import createWaiting from './views/waiting/waiting';
import createGame from './views/game/game';
import createResults from './views/results/results';
// SOCKET
import createSocket from './socket';

export default function createApp(update) {

    // CREATE SOCKET
    createSocket(update);

    // ROUTING
    const switchh = createSwitch(update,
        ['/', createLanding, update, true],
        ['/wait/:game_name', createWaiting, update],
        ['/game/:game_name', createGame, update],
        ['/results/:game_name', createResults, update]
    );

    function test() {
        const { socket } = update.access();
        socket.emit('TEST');
    }

    return {
        view(model) {
            return (
                <div id="app">
                    {switchh.view(model)}
                    <button onClick={test} >TEST</button>
                </div>
            );
        }
    };
}
