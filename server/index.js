// DEPENDENCIES
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

// ENVIRONMENT
require('dotenv').config();
const {
    PORT
} = process.env;

// CONSTANTS
const app = express();
const server = http.Server(app);
const io = socketio(server);

// COUNT
let count = 0;

// MIDDLEWARES
app.use((req, res, next) => {
    count++;
    next();
});

// ENDPOINTS
app.get('*', (req, res) => {
    res.status(200).send({message: "It worked!", count});
});

// LISTEN
server.listen(PORT, () => console.log(`games on ${PORT}`));
