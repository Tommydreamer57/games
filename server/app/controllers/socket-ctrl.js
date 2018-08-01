module.exports = function socket_ctrl(IO, socket, CURRENT_GAMES) {

    return {

        test(data) {
            console.log(data);
            console.log(socket.rooms);
            console.log(socket.session);
            socket.emit('TEST SUCCESSFUL', {
                rooms: socket.rooms,
                session: socket.session,
                CURRENT_GAMES
            });
        },

        createGame({ game_name, player_name }) {
            // IN CASE GAME NAME IS NOT FOUND
            try {
                // add 4 digit code, game, and player to store of games
                // generate 4 digit code - start at AAAA -> ZZZZ, then restart
                const game = CURRENT_GAMES.createGame(game_name, player_name);
                // ADD INDIVIDUAL GAME EVENTS -- these need to be added for each individual socket, so they must be added when a socket joins the game
                const { game_code } = game;
                console.log(`CREATING GAME: ${game_name}, ${player_name}, ${game_code}`);
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
                console.log('EMITTING NEW GAME');
                console.log(game);
                IO.to(game_code).emit('GAME CREATED', game);
            }
            catch (err) {
                console.log(`ERROR CREATING GAME: ${game_name}, ${player_name}, ${err.toString()}`);
                socket.emit('ERROR', err.toString() + ' ERROR CREATING GAME');
            }
        },

        joinGame({ game_code, player_name }) {
            // IN CASE GAME CODE IS NOT FOUND
            try {
                // find correct game by code
                // add player to the game
                const game = CURRENT_GAMES.joinGame(game_code, player_name);
                // ADD INDIVIDUAL GAME EVENTS -- these need to be added for each individual socket, so they must be added when a socket joins the game
                const { game_name } = game;
                console.log(`JOINING GAME: ${game_name}, ${player_name}, ${game_code}`);
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
                IO.to(game_code).emit('GAME JOINED', game);
            }
            catch (err) {
                console.log(`ERROR JOINING GAME: ${player_name}, ${game_code}, ${err.toString()}`);
                socket.emit('ERROR', err.toString() + ' ERROR JOINING GAME');
            }
        },

        leaveGame() {
            try {
                console.log('LEAVING GAME');
                console.log(socket.session);
                // leave all rooms
                for (let room in socket.rooms) {
                    if (room.match(/^[A-Z]{4}$/)) {
                        socket.leave(room)
                        // remove player from game (room is game_code)
                        const game = CURRENT_GAMES.leaveGame(room, socket.session.player_name);
                        // REMOVE INDIVIDUAL GAME EVENTS HERE -- these must be added / removed for each individual socket, so they must be removed when someone leaves the game
                        console.log(game);
                        // let the other players know who left the game
                        IO.to(room).emit('GAME LEFT', game);
                        // let the player know that they successfully left the game
                        socket.emit('YOU LEFT GAME');
                    }
                }
                // remove game from session
                delete socket.session.game_code;
                delete socket.session.game_name;
                console.log('LEFT GAME');
                console.log(socket.session);
            }
            catch (err) {
                console.log(`ERROR LEAVING GAME ${err.toString()}`);
                socket.emit('ERROR', err.toString() + ' ERROR LEAVING GAME');
            }
        },

        startGame() {
            // ADD INDIVIDUAL GAME EVENTS -- or should these be inside CREATE GAME? -- yes these need to be added for each individual socket, so they must be added when a socket joins the game
            const { game_code } = socket.session;
            const game = CURRENT_GAMES.current_games[game_code];
            if (!game) {
                IO.to(game_code).emit('ERROR', `GAME NOT FOUND: ${game_code}`);
                return;
            }
            game.start();
            // send message GAME STARTED
            IO.to(game_code).emit('GAME STARTED', game);
        },

        endGame() {
            // remove game from store of games
            // send message GAME ENDED
        },

        restartGame({ game_code, game_name, players }) {
            // add game back to store of games, with all players
            // send message GAME RESTARTED
        }

    };
    
}