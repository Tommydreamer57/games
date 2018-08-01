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

    // TEST
    socket.on('TEST SUCCESSFUL', data => {
        console.log(data);
    });

    // CREATE
    socket.on('GAME CREATED', current_game => {
        console.log('GAME CREATED');
        console.log(current_game);
        // add game code to model
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to waiting room
        history.push(current_game.current_path);
    });

    // JOIN
    socket.on('GAME JOINED', current_game => {
        console.log('GAME JOINED');
        console.log(current_game);
        // add game name to model
        // add new players to model
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to waiting room
        history.push(current_game.current_path);
    });

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

    // LEAVE (other user)
    socket.on('GAME LEFT', current_game => {
        update(model => ({
            ...model,
            current_game
        }));
    });

    // START
    socket.on('GAME STARTED', current_game => {
        // update game
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to game
        history.push(`/game/${current_game.game_name}`);
        // ADD INDIVIDUAL GAME EVENTS
    });
    
    // END
    socket.on('GAME ENDED', current_game => {
        // update game
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to results
        const game_name = update.access(['current_game', 'game_name']);
        history.push(current_game.current_path);
    });
    
    // RESTART
    socket.on('GAME RESTARTED', current_game => {
        // update game
        update(model => ({
            ...model,
            current_game
        }));
        // reroute to waiting
        history.push(current_game.current_path);
    });

    // ERROR
    socket.on('ERROR', err => {
        console.error(err);
    });

    return socket;
}
