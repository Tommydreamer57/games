import socketio from 'socket.io-client';

const io = socketio();

console.log(io);

export default {
    io
}