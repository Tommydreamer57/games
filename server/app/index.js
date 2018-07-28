// DEPENDENCIES
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const massive = require('massive');

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
app.use(bodyParser.json());
app.use((req, res, next) => {
    // console.log(Object.keys(req));
    next();
});

// ENDPOINTS
app.get('/', (req, res) => {
    count++;
    res.status(200).send({ message: "It worked!", count });
});

// SOCKETS
io.on('connection', socket => {
    console.log('connected');
});

// LISTEN
server.listen(PORT, () => console.log(`games on ${PORT}`));
