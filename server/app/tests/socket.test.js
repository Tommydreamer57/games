const SocketCtrl = require('../controllers/socket-ctrl');
const GameTracker = require('../game-tracker');
const GAMES = require('../games');

class MOCK_IO {
    constructor() {
        this.emissions = [];
        this.room = "";
        this.data = {};
    }
    to(room) {
        this.room = room;
        return this;
    }
    emit(message, data) {
        this.message = message;
        this.data = data;
        let { room } = this;
        this.emissions.push({
            room,
            message,
            data
        });
        this.room = "";
    }
}

class MOCK_SOCKET extends MOCK_IO {
    constructor() {
        super();
        this.rooms = {};
    }
    on(message, callback) {

    }
    join(room) {
        this.rooms[room] = room;
    }
    leave() {
        delete this.rooms[room];
    }
}

function createMockController() {
    const io = new MOCK_IO();
    const socket = new MOCK_SOCKET();
    const CURRENT_GAMES = new GameTracker(GAMES);
    const CTRL = new SocketCtrl(io, socket, CURRENT_GAMES);
    return CTRL;
}

describe('SOCKET TESTS', () => {

    test('can create socket controller', () => {
        expect(createMockController).not.toThrowError();
    });

    test('constructor adds correct keys to controller', () => {
        let CTRL = createMockController();
        expect(CTRL).toHaveProperty('socket.session');
        expect(CTRL).toHaveProperty('IO');
        expect(CTRL).toHaveProperty('CURRENT_GAMES');
    });

    test('TEST emits correct object', () => {
        let CTRL = createMockController();
        CTRL.TEST();
        expect(CTRL).toHaveProperty('socket.emissions');
        expect(CTRL.socket.emissions).toHaveLength(1);
        let emission = CTRL.socket.emissions[0];
        expect(emission.data).toHaveProperty('rooms');
        expect(emission.data).toHaveProperty('session');
        expect(emission.data).toHaveProperty('CURRENT_GAMES');
    });

    test('CREATE GAME', () => {
        
    });

});
