import React, { createRef } from 'react';
// import games from '../../games';

export default function createLanding(update) {

    // INPUT REFERENCES
    const code = createRef();
    const name = createRef();

    function selectGame() {
        const socket = update.access('socket');
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name: name.current.value,
                creator: true
            },
            current_game: {
                ...model.current_game,
                game_name: 'Default'
            }
        }));
        // send game and name to socket (back end will generate 4 digit code, )
        socket.emit('CREATE GAME', {
            game_name: 'Default',
            player_name: name.current.value
        });
        // wait for response - then add 4 digit code and reroute to waiting room
    }
    
    function joinGame() {
        const socket = update.access('socket');
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name: name.current.value
            },
            current_game: {
                ...model.current_game,
                code: code.current.value,
                game_name: 'Default'
            }
        }));
        // send 4 digit code and name to socket
        socket.emit('JOIN GAME', {
            game_code: code.current.value,
            player_name: name.current.value
        });
        // wait for response - then add game to model & reroute to waiting room
    }
    
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
