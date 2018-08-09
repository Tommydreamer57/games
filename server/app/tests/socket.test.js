const SocketCtrl = require('../controllers/socket-ctrl');

const TEST_IO = {};
const TEST_SOCKET = {};
const CONTROLLER = new SocketCtrl(TEST_IO, TEST_SOCKET);

describe('SOCKET TESTS', () => {

    test('', () => {
        expect(true).toBe(true);
    })
});
