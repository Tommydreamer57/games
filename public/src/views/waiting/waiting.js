import React from 'react';

export default function createWaiting(update) {

    function startGame() {
        // access socket & send message to start game
        const socket = update.access('socket');
        socket.emit('START GAME');
    }

    function leaveGame() {
        // access socket & send message to leave game
        const socket = update.access('socket');
        socket.emit('LEAVE GAME');
    }
    
    return {
        view(model) {
            if (!model.current_game.game_code) {
                const history = update.access(['router', 'history']);
                setTimeout(() => history.push('/'));
            }
            return (
                <div>
                    WAITING
                    {/* 4 DIGIT CODE */}
                    <h1>{model.current_game.game_code}</h1>
                    {/* RENDER CORRECT WAITING ROOM FOR GAME */}
                    {/* START BUTTON */}
                    <button onClick={startGame} >START GAME</button>
                    {/* CANCEL BUTTON */}
                    <button onClick={leaveGame} >LEAVE GAME</button>
                    {/* LIST OF PLAYERS */}
                    {model.current_game.players.map(player => (
                        <div>{player.player_name}</div>
                    ))}
                </div>
            );
        }
    };
}
