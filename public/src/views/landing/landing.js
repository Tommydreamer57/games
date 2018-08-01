import React, { createRef } from 'react';
// import games from '../../games';
import createSocket from '../../socket';

export default function createLanding(update) {

    const code = createRef();
    const name = createRef();
    const socket = createSocket(update);

    function selectGame() {
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                name: name.current.value,
                creator: true
            },
            current_game: {
                ...model.current_game,
                name: 'Default'
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
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                name: name.current.value
            },
            current_game: {
                ...model.current_game,
                code: code.current.value,
                name: 'Default'
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
