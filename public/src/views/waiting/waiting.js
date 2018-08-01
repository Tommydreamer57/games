import React from 'react';

export default function createWaiting(update) {
    function startGame() {
        // access socket & send message to start game
        // listen for response & then reroute to game
    }
    return {
        view(model) {
            return (
                <div>
                    WAITING
                    {/* 4 DIGIT CODE */}
                    <h1>{model.current_game.game_code}</h1>
                    {/* RENDER CORRECT WAITING ROOM FOR GAME */}
                    {/* START BUTTON */}
                    {/* CANCEL BUTTON */}
                    {/* LIST OF PLAYERS */}
                    {model.current_game.players.map(player => (
                        <div>{player.player_name}</div>
                    ))}
                </div>
            );
        }
    };
}
