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
                    {/* CHOOSE A NEW GAME -- with icons */}
                    {/* LINK BACK TO LANDING */}
                </div>
            );
        }
    };
}
