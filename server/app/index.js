// DEVENDENCIES
const SOCKET_SERVER = require('socket.io');
const HTTP = require('http');

// ENVIRONMENT
require('dotenv').config();
const {
    PORT
} = process.env;

// SERVER
const SERVER = HTTP.createServer();

// CURRENT_GAMES
const CURRENT_GAMES = {

};

// SOCKETS
const IO = new SOCKET_SERVER(SERVER);

IO.on('connection', socket => {
    console.log('connected');

    socket.on('TEST', data => {
        console.log(data);
        socket.emit('TEST SUCCESSFUL');
    });

    // CREATE GAME
    socket.on('CREATE GAME', ({ game_name, player_name }) => {
        // generate 4 digit code - start at AAAA -> ZZZZ, then restart
        // join the room socket.join(game_code)
        // add 4 digit code, game, and player to store of games
        // send 4 digit code GAME CREATED
    });

    // JOIN GAME
    socket.on('JOIN GAME', ({ game_code, player_name }) => {
        // find correct game by code
        // join the room
        // add player to the game
        // send the game_name GAME JOINED
    });

    // START GAME
    socket.on('START GAME', () => {
        // send message GAME STARTED
        // INDIVIDUAL GAME EVENTS
    });

    // END GAME
    socket.on('END GAME', () => {
        // remove game from store of games
        // send message GAME ENDED
    });

    // RESTART GAME
    socket.on('RESTART GAME', ({ game_code, game_name, players }) => {
        // add game back to store of games, with all players
        // send message GAME RESTARTED
    });

});

// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
