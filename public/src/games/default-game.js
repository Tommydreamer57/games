import React from 'react';

export default {
    name: 'Default',
    description: 'this is the default game',
    max_players: 5,
    min_players: 2,
    icon: '',
    component(update) {
        return {
            view(model) {
                return (
                    <div>
                        DEFAULT GAME
                        {JSON.stringify(model.current_game, null, 4)}
                    </div>
                );
            }
        };
    },
    results(update) {
        return {
            view(model) {
                return (
                    <div>
                        DEFAULT GAME RESULTS
                    </div>
                );
            }
        }
    }
}
