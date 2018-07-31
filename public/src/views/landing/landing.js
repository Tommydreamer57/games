import React, { createRef } from 'react';
// import games from '../../games';
import createSocket from '../../socket';

export default function createLanding(update) {

    const code = createRef();
    const name = createRef();

    function selectGame(game) {
        // add selected game to model
        // initialize socket connection
        const socket = createSocket(update);
        // add socket to model -- maybe?
        // send game and name to socket (back end will generate 4 digit code, )
        socket.emit('CREATE GAME', {
            game_name: 'Default',
            player_name: name.current.value
        });
        // wait for response - then add 4 digit code and reroute to waiting room
    }

    function joinGame(game) {
        // initialize socket connection
        const socket = createSocket(update);
        // add socket to model -- maybe?
        // send 4 digit code and name to socket
        socket.emit('JOIN GAME', {
            game_code: code.current.value,
            player_name: name.current.value
        });
        // wait for response - then add game to model & reroute to waiting room
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
                </div>
            );
        }
    };
}
