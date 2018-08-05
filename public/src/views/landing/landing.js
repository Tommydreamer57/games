import React, { createRef } from 'react';
import games from '../../games';

export default function createLanding(update) {

    // INPUT REFERENCES
    const code = createRef();
    const name = createRef();

    // SELECT GAME
    function selectGame({ target: { value: game_name } }) {
        const { socket } = update.access();
        const player_name = name.current.value;
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name
            },
            current_game: {
                ...model.current_game,
                game_name
            }
        }));
        // send game and name to socket (back end will generate 4 digit code, )
        socket.emit('CREATE GAME', {
            game_name,
            player_name
        });
    }

    // JOIN GAME
    function joinGame() {
        const socket = update.access('socket');
        const player_name = name.current.value;
        const game_code = code.current.value;
        // add selected game and username to model
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                player_name
            }
        }));
        // send 4 digit code and name to socket
        socket.emit('JOIN GAME', {
            game_code,
            player_name
        });
    }

    // TEST
    function test() {
        const socket = update.access('socket');
        socket.emit('TEST');
    }

    return {
        view(model) {
            if (code.current) code.current.value = model.current_game.game_code || '';
            if (name.current) name.current.value = model.current_player.player_name || '';
            return (
                <div>
                    LANDING
                    {/* 4 DIGIT CODE INPUT */}
                    <input placeholder="CODE" ref={code} />
                    {/* NAME INPUT */}
                    <input placeholder="NAME" ref={name} />
                    <button onClick={joinGame} >JOIN GAME</button>
                    {/* GAME LIST */}
                    {Object.values(games).map(game => (
                        <div>
                            {/* fix to game_name later */}
                            <h3>{game.name}</h3>
                            <h4>{game.description}</h4>
                            <button onClick={selectGame} value={game.name} >START</button>
                        </div>
                    ))}
                    <button onClick={selectGame} >CREATE GAME</button>
                    <button onClick={test} >TEST</button>
                </div>
            );
        }
    };
}
