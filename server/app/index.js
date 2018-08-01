// DEPENDENCIES
const SOCKET_SERVER = require('socket.io');
const HTTP = require('http');
// GAMES
const GAMES = require('./games');
const GameTracker = require('./game-tracker');
// CONTROLLER
const socket_ctrl = require('./controllers/socket-ctrl');


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

    // CONTROLLER
    const CTRL = socket_ctrl(IO, socket, CURRENT_GAMES);

    // TEST
    socket.on('TEST', CTRL.test);

    // CREATE GAME
    socket.on('CREATE GAME', CTRL.createGame);

    // JOIN GAME
    socket.on('JOIN GAME', CTRL.joinGame);

    // LEAVE GAME
    socket.on('LEAVE GAME', CTRL.leaveGame);

    // START GAME
    socket.on('START GAME', CTRL.startGame);

    // END GAME
    socket.on('END GAME', CTRL.endGame);

    // RESTART GAME
    socket.on('RESTART GAME', CTRL.restartGame);

    // ON DISCONNECT
    socket.on('disconnect', () => { // is this correct?

    });

});


// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
