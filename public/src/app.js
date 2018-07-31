import React from 'react';
import { createSwitch } from './mitosis-router';
import createLanding from './views/landing/landing';
import createWaiting from './views/waiting/waiting';
import createGame from './views/game/game';
import createResults from './views/results/results';

export default function createApp(update) {

    const switchh = createSwitch(update,
        ['/', createLanding, update, true],
        ['/wait', createWaiting, update],
        ['/game', createGame, update],
        ['/results', createResults, update]
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
