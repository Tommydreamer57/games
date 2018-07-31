import io from 'socket.io-client';

export default function createSocket(update) {
    const socket = io('http://127.0.0.1:5001');

    // socket.on('...')

    return socket
}
