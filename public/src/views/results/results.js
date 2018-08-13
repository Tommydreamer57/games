import React from 'react';
import games from '../../games';

export default function createResults(update) {

    function restartGame() {
        // send message to socket to play game again
        // then reroute to waiting room
        const socket = update.access('socket');
        socket.emit('RESTART GAME');
    }

    // SELECT GAME
    function selectGame({ target: { value: game_name } }) {
        const socket = update.access('socket');
        // add selected game and username to model
        update(model => ({
            ...model,
            current_game: {
                ...model.current_game,
                game_name
            }
        }));
        // send game and name to socket (back end will generate 4 digit code, )
        socket.emit('START DIFFERENT GAME', { game_name });
    }

    return {
        view(model) {
            return (
                <div>
                    RESULTS
                    {/* GAME RESULTS - SPECIFIC TO EACH GAME */}
                    {/* REPLAY BUTTON */}
                    <button onClick={restartGame} >RESTART</button>
                    {/* FINISH - LINK BACK TO LANDING */}
                </div>
            );
        }
    };
}
