import io from 'socket.io-client';

export default function createSocket(update) {

    // SOCKET
    // localhost
    const socket = io('http://127.0.0.1:5001');
    // for connecting with iphone/other computers - insert own ip address here (find with `ipconfig` or `ifconfig`)
    // const socket = io('http://192.168.0.43:5001');

    // ADD SOCKET TO MODEL
    update(model => ({
        ...model,
        socket
    }));

    // HISTORY
    const history = update.access(['router', 'history']);

    // EVENTS

    function updateGame(current_game) {
        // update game
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to game
        history.push(current_game.current_path);
    }

    // TEST
    socket.on('TEST SUCCESSFUL', data => {
        console.log(data);
    });

    // UPDATE
    socket.on('GAME UPDATED', updateGame);

    // LEAVE (current_user)
    socket.on('YOU LEFT GAME', () => {
        // clear game
        update(model => ({
            ...model,
            current_game: {
                players: []
            }
        }));
        // reroute to landing
        history.push('/');
    });

    // ERROR
    socket.on('ERROR', err => {
        console.error(err);
    });

    return socket;
}
