module.exports = function socket_ctrl(IO, socket, CURRENT_GAMES) {

    return {

        TEST(data) {
            socket.emit('TEST SUCCESSFUL', {
                rooms: socket.rooms,
                session: socket.session,
                CURRENT_GAMES
            });
        },

        CREATE_GAME({ game_name, player_name }) {
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
                IO.to(game_code).emit('GAME UPDATED', game);
            }
            catch (err) {
                socket.emit('ERROR', err.toString() + ' ERROR CREATING GAME');
            }
        },

        JOIN_GAME({ game_code, player_name }) {
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
                IO.to(game_code).emit('GAME UPDATED', game);
            }
            catch (err) {
                socket.emit('ERROR', err.toString() + ' ERROR JOINING GAME');
            }
        },

        LEAVE_GAME() {
            try {
                // leave all rooms
                for (let room in socket.rooms) {
                    if (room.match(/^[A-Z]{4}$/)) {
                        socket.leave(room)
                        // remove player from game (room is game_code)
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
                socket.emit('ERROR', err.toString() + ' ERROR LEAVING GAME');
            }
        },

        START_GAME() {
            const { game_code } = socket.session;
            const game = CURRENT_GAMES.current_games[game_code];
            if (game) {
                game.start();
                IO.to(game_code).emit('GAME UPDATED', game);
            } else {
                IO.to(game_code).emit('ERROR', `GAME NOT FOUND: ${game_code}`);
            }
        },
        
        END_GAME() {
            const { game_code } = socket.session;
            const game = CURRENT_GAMES.current_games[game_code];
            game.end();
            IO.to(game_code).emit('GAME UPDATED', game);
        },
        
        PAUSE_GAME() {
            const { game_code } = socket.session;
            const game = CURRENT_GAMES.current_games[game_code];
            game.pause();
            IO.to(game_code).emit('GAME UPDATED', game);
        },
        
        RESTART_GAME() {
            const { game_code, game_name } = socket.session;
            const new_game = CURRENT_GAMES.startNextGame(game_code, game_name);
            IO.to(game_code).emit('GAME UPDATED', new_game);
        },
        
        START_DIFFERENT_GAME({ game_name }) {
            const { game_code } = socket.session;
            // instantiate different game class
            const new_game = CURRENT_GAMES.startNextGame(game_code, game_name);
            Object.assign(socket.session, {
                game_name
            });
            IO.to(game_code).emit('GAME UPDATED', new_game);
        },

        disconnect() {
            try {
                const {
                    game_code,
                    player_name
                } = socket.session;
                const game = CURRENT_GAMES.leaveGame(game_code, player_name);
                IO.to(game_code).emit('GAME UPDATED', game);
                // remove game from session
                delete socket.session.game_code;
                delete socket.session.game_name;
            }
            catch (err) {
                socket.emit('ERROR', err.toString() + ' ERROR LEAVING GAME');
            }
        }

    };

}