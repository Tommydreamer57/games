import React from 'react';

export default function createResults(update) {
    function playAgain() {
        // send message to socket to play game again
        // then reroute to waiting room
    }
    return {
        view(model) {
            return (
                <div>
                    RESULTS
                    {/* GAME RESULTS - SPECIFIC TO EACH GAME */}
                    {/* PLAY AGAIN BUTTON */}
                    {/* BACK TO LANDING LINK */}
                </div>
            );
        }
    };
}