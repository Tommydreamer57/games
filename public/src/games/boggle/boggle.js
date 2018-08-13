import React from 'react';
import { Board, WordInput, WordList } from './components';
import { Timer } from '../../components';

export default function component(update) {

    const { socket } = update.access();

    function change({ target: { value } }) {
        update(model => ({
            ...model,
            current_player: {
                ...model.current_player,
                current_word: value
            }
        }));
    }

    function keyDown({ key, target: { value } }) {
        if (key === 'Enter') {
            update(model => ({
                ...model,
                current_player: {
                    ...model.current_player,
                    current_word: ""
                }
            }));
            socket.emit('UPDATE GAME', { word: value });
        }
    }

    function end() {
        socket.emit('END GAME');
    }

    return {
        // clear(model) {

        // },
        // init(model) {

        // },
        view(model) {
            const {
                current_player: {
                    current_word,
                    player_name
                },
                current_game: {
                    board,
                    players
                }
            } = model;
            const { words } = players.find(player => player.player_name === player_name);
            return (
                <div id="Boggle" >
                    <Board
                        board={board}
                        word={current_word}
                    />
                    <WordInput
                        word={current_word}
                        change={change}
                        keyDown={keyDown}
                    />
                    <WordList
                        words={words}
                    />
                    <Timer
                        time={1000 * 60 * 3}
                    />
                    <button onClick={end} >END</button>
                </div>
            );
        }
    };
}

export function results(update) {
    return {
        view(model) {
            return (
                <div>
                    BOGGLE RESULTS
                </div>
            );
        }
    };
}
