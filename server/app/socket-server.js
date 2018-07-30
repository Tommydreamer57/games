// DEVENDENCIES
const SOCKETIO = require('socket.io');
const HTTP = require('http');

// ENVIRONMENT
require('dotenv').config();
const {
    SOCKET_PORT
} = process.env;

// SERVER
const SERVER = HTTP.createServer();

// SOCKETS
const IO = new SOCKETIO();

IO.on('connection', socket => {
    console.log('connected');
});

// LISTEN
SERVER.listen(SOCKET_PORT);

console.log(`game sockets on ${SOCKET_PORT}`);
