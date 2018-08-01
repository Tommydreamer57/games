import io from 'socket.io-client';

export default function createSocket(update) {

    // SOCKET
    const socket = io('http://127.0.0.1:5001');

    // HISTORY
    const history = update.access(['router', 'history']);

    // EVENTS

    // TEST
    socket.on('TEST SUCCESSFUL', data => {
        console.log(data);
    });

    // CREATE
    socket.on('GAME CREATED', (current_game) => {
        console.log('GAME CREATED');
        console.log(current_game);
        // add game code to model
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to waiting room
        const game_name = update.access(['current_game', 'name']);
        history.push(`/wait/${current_game.game_name}`);
    });
    
    // JOIN
    socket.on('GAME JOINED', (current_game) => {
        console.log('GAME JOINED');
        console.log(current_game);
        // add game name to model
        // add new players to model
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to waiting room
        history.push(`/wait/${current_game.game_name}`);
    });

    // LEAVE
    socket.on('GAME LEFT', () => {
        // clear game
        update(model => ({
            ...model,
            current_game: {}
        }));
        // reroute to landing
        history.push('/');
    });

    // START
    socket.on('GAME STARTED', () => {
        // reroute to games
        const game_name = update.access(['current_game', 'name']);
        history.push(`/game/${game_name}`);
        // ADD INDIVIDUAL GAME EVENTS
    });

    // END
    socket.on('GAME ENDED', results => {
        // reroute to results
        const game_name = update.access(['current_game', 'name']);
        history.push(`/results/${game_name}`);
    });

    // RESTART
    socket.on('GAME RESTARTED', () => {
        // reroute to waiting
        const game_name = update.access(['current_game', 'name']);
        history.push(`/wait/${game_name}`);
    });

    // ERROR
    socket.on('ERROR', err => {
        console.error(err);
    });

    return socket;
}
