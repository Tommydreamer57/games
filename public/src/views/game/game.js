import React from 'react';

export default function createGames(update) {
    function leaveGame() {
        // send message to socket to leave game
        // then reroute to landing
    }
    return {
        view(model) {
            return (
                <div>
                    GAMES
                    {/* RENDER CORRECT GAME */}
                    {/* LEAVE GAME */}
                </div>
            );
        }
    };
}
