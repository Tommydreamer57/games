// DEPENDENCIES
const SOCKET_SERVER = require('socket.io');
const HTTP = require('http');
// GAMES
const GAMES = require('./games');
const GameTracker = require('./game-tracker');

// ENVIRONMENT
require('dotenv').config();
const {
    PORT
} = process.env;

// SERVER
const SERVER = HTTP.createServer();

// CURRENT_GAMES - maybe make this into a class - with methods add game, add player, etc...
const CURRENT_GAMES = new GameTracker(GAMES);

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
        // add 4 digit code, game, and player to store of games
        // generate 4 digit code - start at AAAA -> ZZZZ, then restart
        const game_code = CURRENT_GAMES.createGame(game_name, player_name);
        // join the room
        socket.join(game_code);
        // send 4 digit code GAME CREATED
        socket.to(game_code).emit('GAME CREATED');
    });

    // JOIN GAME
    socket.on('JOIN GAME', ({ game_code, player_name }) => {
        // find correct game by code
        // add player to the game
        const game_name = CURRENT_GAMES.joinGame(game_code, player_name);
        // join the room
        socket.join(game_code);
        // send the game_name GAME JOINED
        socket.to(game_code).emit('GAME JOINED', player_name);
    });

    // LEAVE GAME
    socket.on('LEAVE GAME', () => {
        // leave the room
        let game_code = socket.room
        // socket.leave(socket.rooms[0])
        // remove player from game
        CURRENT_GAMES.removePlayer
        // emit message with who left
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

    // ON DISCONNECT
    socket.on('disconnect', () => { // is this correct?

    });

});

// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
