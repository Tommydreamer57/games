// DEPENDENCIES
const SOCKET_SERVER = require('socket.io');
const HTTP = require('http');
// CONTROLLER
const SocketCtrl = require('./controllers/socket-ctrl');


// ENVIRONMENT
require('dotenv').config();

const {
    PORT
} = process.env;


// SERVER
const SERVER = HTTP.createServer();


// SOCKETS
const IO = new SOCKET_SERVER(SERVER);


// CONNECTION
IO.on('connection', socket => {

    console.log('connected');

    // CONTROLLER
    const CTRL = new SocketCtrl(IO, socket);

    // EVENTS
    for (let event in CTRL) if (typeof CTRL[event] === 'function') socket.on(event.replace(/_/g, ' '), CTRL[event]);

});


// LISTEN
SERVER.listen(PORT);

console.log(`game sockets on ${PORT}`);
