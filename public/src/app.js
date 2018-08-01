import React from 'react';
import { createSwitch } from './mitosis-router';
import createLanding from './views/landing/landing';
import createWaiting from './views/waiting/waiting';
import createGame from './views/game/game';
import createResults from './views/results/results';

export default function createApp(update) {

    const switchh = createSwitch(update,
        ['/', createLanding, update, true],
        ['/wait/:game_name', createWaiting, update],
        ['/game/:game_name', createGame, update],
        ['/results/:game_name', createResults, update]
    );

    // handleInput() {
    //     update(model => model)
    // }

    return {
        view(model) {
            return (
                <div id="app">
                    {switchh.view(model)}
                </div>
            );
        }
    };
}
