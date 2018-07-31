import io from 'socket.io-client';

const socket = io('http://127.0.0.1:5001', { reconnect: true });

socket.emit('TEST', { data: 'testing' });

socket.on('TEST SUCCESSFUL', () => {
    console.log('TEST SUCCESSFUL -- sockets connected');
});

export default socket;
