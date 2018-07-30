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

// SOCKETS
const IO = new SOCKET_SERVER(SERVER);

IO.on('connection', socket => {
    console.log('connected');

    socket.on('TEST', data => {
        console.log(data);
        socket.emit('TEST SUCCESSFUL');
    });

});

// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
