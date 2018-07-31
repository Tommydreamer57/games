import React from 'react';
// import games from '../../games';
// MAYBE EXTRACT THIS CODE INTO SOCKET FILE
import io from 'socket.io-client';

export default function createLanding(update) {
    
    function selectGame(game) {
        // add selected game to model
        // initialize socket connection
        const socket = io('http://127.0.0.1:5001');
        // add socket to model -- maybe?
        // send game and name to socket (back end will generate 4 digit code, )
        // wait for response - then add 4 digit code and reroute to waiting room
    }
    function joinGame(game) {
        // initialize socket connection
        const socket = io('http://127.0.0.1:5001');
        // add socket to model -- maybe?
        // send 4 digit code and name to socket
        // wait for response - then add game to model & reroute to waiting room
    }
    return {
        view(model) {
            return (
                <div>
                    LANDING
                    {/* 4 DIGIT CODE INPUT */}
                    {/* NAME INPUT */}
                    {/* GAME LIST */}
                </div>
            );
        }
    };
}
