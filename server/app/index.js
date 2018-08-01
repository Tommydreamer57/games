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

    // CREATE SESSION
    socket.session = {};

    // CONTROLLER
    const CTRL = socket_ctrl(IO, socket, CURRENT_GAMES);

    // EVENTS
    for (let event in CTRL) {
        socket.on(event.replace(/_/g, ' '), CTRL[event]);
    }

});


// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
