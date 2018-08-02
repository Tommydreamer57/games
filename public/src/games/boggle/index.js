import React from 'react';

export default {
    name: 'Boggle',
    description: 'this is a word game',
    max_players: 5,
    min_players: 2,
    component(update) {
        return {
            view(model) {
                return (
                    <div>
                        BOGGLE
                    </div>
                );
            }
        };
    }
}
