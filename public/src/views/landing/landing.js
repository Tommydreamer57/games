import React, { createRef } from 'react';
// import games from '../../games';

export default function createLanding(update) {

    // INPUT REFERENCES
    const code = createRef();
    const name = createRef();

    // SELECT GAME
    function selectGame() {
        const socket = update.access('socket');
        const player_name = name.current.value;
        const game_name = 'Default';
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name
            },
            current_game: {
                ...model.current_game,
                game_name
            }
        }));
        // send game and name to socket (back end will generate 4 digit code, )
        socket.emit('CREATE GAME', {
            game_name,
            player_name
        });
    }
    
    // JOIN GAME
    function joinGame() {
        const socket = update.access('socket');
        const player_name = name.current.value;
        const game_code = code.current.value;
        const game_name = 'Default';
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name
            },
            current_game: {
                ...model.current_game,
                game_code,
                game_name
            }
        }));
        // send 4 digit code and name to socket
        socket.emit('JOIN GAME', {
            game_code,
            player_name
        });
    }
    
    // TEST
    function test() {
        const socket = update.access('socket');
        socket.emit('TEST');
    }

    return {
        view(model) {
            return (
                <div>
                    LANDING
                    {/* 4 DIGIT CODE INPUT */}
                    <input placeholder="CODE" ref={code} />
                    {/* NAME INPUT */}
                    <input placeholder="NAME" ref={name} />
                    <button onClick={joinGame} >JOIN GAME</button>
                    {/* GAME LIST */}
                    <button onClick={selectGame} >CREATE GAME</button>
                    <button onClick={test} >TEST</button>
                </div>
            );
        }
    };
}
