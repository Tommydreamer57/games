import io from 'socket.io-client';

export default function sockets(update) {

    const socket = io('http://127.0.0.1:5001', { reconnect: true });

    socket.emit('TEST', { data: 'data' });

    socket.on('TEST SUCCESSFUL', () => {
        console.log('TEST SUCCESSFUL -- sockets connected');
    });

    return function socketMiddleware(model) {
        console.log("socket middleware");
        return {
            ...model,
            socket
        };
    }
}