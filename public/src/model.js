import socket from './socket';

export default {
    socket,
    current_player: {},
    current_game: {
        players: []
    },
    router: {
        history: {
            location: {}
        },
        match: {
            params: {},
        },
        routes: []
    }
}
