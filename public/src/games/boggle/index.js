import React from 'react';

export default {
    name: 'Default',
    description: 'this is the default game',
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
