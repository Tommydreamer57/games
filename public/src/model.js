import socketio from 'socket.io-client';
import { socket_url, express_url } from './.env.js';

const io = socketio(socket_url);

export default {
    io,
    express_url,
    socket_url
}
