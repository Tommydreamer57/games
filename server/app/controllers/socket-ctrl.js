// GAMES
const GameTracker = require('../game-tracker');
const GAMES = require('../games');
// UTILS
const { JSONFriendly } = require('../utils');


// GAME TRACKER
const CURRENT_GAMES = new GameTracker(GAMES);


// CONTROLLER
module.exports = class SocketCtrl {

    constructor(IO, socket) {
        // create session
        socket.session = {};
        this.IO = IO;
        this.socket = socket;
        // bind all methods
        for (let method of Object.getOwnPropertyNames(SocketCtrl.prototype)) {
            this[method] = this[method].bind(this);
        }
    }

    TEST(data) {
        const { socket } = this;
        socket.emit('TEST SUCCESSFUL', JSONFriendly({
            rooms: socket.rooms,
            session: socket.session,
            CURRENT_GAMES
        }));
    }

    CREATE_GAME({ game_name, player_name }) {
        const { IO, socket } = this;
        // IN CASE GAME NAME IS NOT FOUND
        try {
            const game = CURRENT_GAMES.createGame(game_name, player_name);
            const { game_code } = game;
            // leave other rooms
            for (let room in socket.rooms) {
                if (room !== game_code && room.match(/^[A-Z]{4}$/)) {
                    socket.leave(room);
                }
            }
            // add player/game info to socket
            Object.assign(socket.session, {
                player_name,
                game_code,
                game_name
            });
            // join the room
            socket.join(game_code);
            // send 4 digit code GAME CREATED
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
        }
        catch (err) {
            console.trace(err);
            socket.emit('ERROR', `ERROR CREATING GAME ${err.toString()}`);
        }
    }

    JOIN_GAME({ game_code, player_name }) {
        const { IO, socket } = this;
        // IN CASE GAME CODE IS NOT FOUND
        try {
            // find correct game by code
            // add player to the game
            const game = CURRENT_GAMES.joinGame(game_code, player_name);
            const { game_name } = game;
            // leave other rooms
            for (let room in socket.rooms) {
                if (room !== game_code && room.match(/^[A-Z]{4}$/)) {
                    socket.leave(room);
                }
            }
            // add player/game info to socket
            Object.assign(socket.session, {
                player_name,
                game_code,
                game_name
            });
            // join the room
            socket.join(game_code);
            // send the name GAME JOINED
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
        }
        catch (err) {
            console.trace(err);
            socket.emit('ERROR', `ERROR JOINING GAME ${err.toString()}`);
        }
    }

    LEAVE_GAME() {
        const { IO, socket } = this;
        try {
            // leave all rooms
            for (let room in socket.rooms) {
                if (room.match(/^[A-Z]{4}$/)) {
                    socket.leave(room)
                    // remove player from game (room === game_code)
                    const game = CURRENT_GAMES.leaveGame(room, socket.session.player_name);
                    // let the other players know who left the game
                    IO.to(room).emit('GAME UPDATED', game);
                    // let the player know that they successfully left the game
                    socket.emit('YOU LEFT GAME');
                }
            }
            // remove game from session
            delete socket.session.game_code;
            delete socket.session.game_name;
        }
        catch (err) {
            // console.trace(err);
            // socket.emit('ERROR', `ERROR LEAVING GAME ${err.toString()}`);
        }
    }

    START_GAME() {
        const { IO, socket } = this;
        const { game_code } = socket.session;
        const game = CURRENT_GAMES.current_games[game_code];
        if (game) {
            game.start();
            if (game.time_limit) {
                setTimeout(this.END_GAME.bind(this), game.time_limit);
            }
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
        } else {
            IO.to(game_code).emit('ERROR', `GAME NOT FOUND: ${game_code}`);
        }
    }

    UPDATE_GAME(data) {
        const { IO, socket } = this;
        const { game_code, player_name } = socket.session;
        const game = CURRENT_GAMES.current_games[game_code];
        if (game) {
            console.log('UPDATING GAME');
            console.log(data);
            game.update(player_name, data);
            console.log(JSONFriendly(game));
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
        } else {
            IO.to(game_code).emit('ERROR', `GAME NOT FOUND: ${game_code}`);
        }
    }

    PAUSE_GAME() {
        const { IO, socket } = this;
        const { game_code } = socket.session;
        const game = CURRENT_GAMES.current_games[game_code];
        game.pause();
        IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
    }

    END_GAME() {
        const { IO, socket } = this;
        const { game_code } = socket.session;
        const game = CURRENT_GAMES.current_games[game_code];
        if (game) {
            let async = game.end();
            console.log('ENDED GAME');
            console.log(async);
            // to handle asyncronous scoring of games
            if (async && typeof async.then === 'function') {
                console.log('WAITING FOR RESPONSE');
                async.then(() => {
                    IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
                    console.log('FINISHED SCORING GAME');
                });
            }
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
        } else {
            IO.to(game_code).emit('ERROR', `GAME NOT FOUND: ${game_code}`);
        }
    }

    RESTART_GAME() {
        const { IO, socket } = this;
        try {
            const { game_code, game_name } = socket.session;
            const new_game = CURRENT_GAMES.startNextGame(game_code, game_name);
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(new_game));
        }
        catch (err) {
            console.trace(err);
            socket.emit('ERROR', `ERROR CREATING GAME ${err.toString()}`);
        }
    }

    START_DIFFERENT_GAME({ game_name }) {
        const { IO, socket } = this;
        try {
            const { game_code } = socket.session;
            // instantiate different game class
            const new_game = CURRENT_GAMES.startNextGame(game_code, game_name);
            Object.assign(socket.session, {
                game_name
            });
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(new_game));
        }
        catch (err) {
            console.trace(err);
            socket.emit('ERROR', `ERROR CREATING GAME ${err.toString()}`);
        }
    }

    disconnect() {
        const { IO, socket } = this;
        try {
            const {
                game_code,
                player_name
            } = socket.session;
            const game = CURRENT_GAMES.leaveGame(game_code, player_name);
            IO.to(game_code).emit('GAME UPDATED', JSONFriendly(game));
            // remove game from session
            delete socket.session.game_code;
            delete socket.session.game_name;
        }
        catch (err) {
            console.trace(err);
            socket.emit('ERROR', `ERROR LEAVING GAME ${err.toString()}`);
        }
    }

}