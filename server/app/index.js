// DEPENDENCIES
const SOCKET_SERVER = require('socket.io');
const HTTP = require('http');
// CONTROLLER
const SocketCtrl = require('./controllers/socket-ctrl');
// GAMES
const GameTracker = require('./game-tracker');
const GAMES = require('./games');

// ENVIRONMENT
require('dotenv').config();

const {
    PORT
} = process.env;


// SERVER
const SERVER = HTTP.createServer();


// SOCKETS
const IO = new SOCKET_SERVER(SERVER);


// GAME TRACKER
const CURRENT_GAMES = new GameTracker(GAMES);


// CONNECTION
IO.on('connection', socket => new SocketCtrl(IO, socket, CURRENT_GAMES));


// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
