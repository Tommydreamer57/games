import io from 'socket.io-client';

export default function createSocket(update) {

    const socket = io('http://127.0.0.1:5001');

    // TEST
    socket.on('TEST SUCCESSFUL', data => console.log(data));

    // CREATE
    socket.on('GAME CREATED', ({ game_code }) => {
        // add game code to model
        update(model => ({
            ...model,
            current_game: {
                ...model.current_game,
                code: game_code
            }
        }));
        // reroute to waiting room
        const history = update.access(['router', 'history']);
        const game_name = update.access(['current_game', 'name']);
        history.push(`/wait/${game_name}`);
    });

    // JOIN
    socket.on('GAME JOINED', ({ name, players }) => {
        // add game name to model
        // add new players to model
        update(model => ({
            ...model,
            current_game: {
                ...model.current_game,
                name,
                players
            }
        }));
        // reroute to waiting room
        const history = update.access(['router', 'history']);
        history.push(`/wait/${name}`);
    });

    // LEAVE
    socket.on('GAME LEFT', () => {
        // clear game
        update(model => ({
            ...model,
            current_game: {}
        }));
        // reroute to landing
        const history = update.access(['router', 'history']);
        history.push('/');
    });

    // START
    socket.on('GAME STARTED', () => {
        // reroute to games
        const history = update.access(['router', 'history']);
        const game_name = update.access(['current_game', 'name']);
        history.push(`/game/${game_name}`);
        // ADD INDIVIDUAL GAME EVENTS
    });

    // END
    socket.on('GAME ENDED', results => {
        // reroute to results
        const history = update.access(['router', 'history']);
        const game_name = update.access(['current_game', 'name']);
        history.push(`/results/${game_name}`);
    });

    // RESTART
    socket.on('GAME RESTARTED', () => {
        // reroute to waiting
        const history = update.access(['router', 'history']);
        const game_name = update.access(['current_game', 'name']);
        history.push(`/wait/${game_name}`);
    });

    // ERROR
    socket.on('ERROR', err => console.error(err));

    return socket;
}
