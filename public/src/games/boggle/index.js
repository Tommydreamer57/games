import React from 'react';
import { Board, WordInput, WordList } from './components';
// import './boggle.css';

export default {
    name: 'Boggle',
    description: 'this is a word game',
    max_players: 24,
    min_players: 2,
    component(update) {

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
                        <button onClick={end} >END</button>
                    </div>
                );
            }
        };
    }
}

/**
 * COMPONENT TREE
 * 
 * This
 * - Board
 *     - Letter
 * - Word Input
 * - Word List
 */
