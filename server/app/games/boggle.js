const DefaultGame = require('./default-game');
const axios = require('axios');
const { JSONFriendly } = require('../utils');

module.exports = class Boggle extends DefaultGame {

    // STATICS

    static getLetters() {
        const letters = [];
        const frequencies = {
            A: 12,
            B: 1,
            C: 5,
            D: 6,
            E: 19,
            F: 4,
            G: 3,
            H: 5,
            I: 11,
            J: 1,
            K: 1,
            L: 5,
            M: 4,
            N: 11,
            O: 11,
            P: 4,
            Qu: 1,
            R: 12,
            S: 9,
            T: 13,
            U: 4,
            V: 1,
            W: 2,
            X: 1,
            Y: 3,
            Z: 1
        };
        for (let letter in frequencies) {
            while (frequencies[letter] > 0) {
                letters.push(letter);
                frequencies[letter]--;
            }
        }
        return letters;
    }

    static createRandomBoard(dimension) {
        const board = [];
        const letters = Boggle.getLetters();
        for (let y = 0; y < dimension; y++) {
            const row = [];
            for (let x = 0; x < dimension; x++) {
                let randomIndex = ~~(Math.random() * letters.length);
                let letter = letters.splice(randomIndex, 1)[0];
                row.push({ x, y, letter });
            }
            board.push(row);
        }
        return board;
    }

    static scoreWord(word, dimension) {
        switch (dimension) {
            case 3:
            case 4:
                switch (word.length) {
                    case 0:
                    case 1:
                    case 2:
                        return 0;
                    case 3:
                    case 4:
                        return 1;
                    case 5:
                        return 2;
                    case 6:
                        return 3;
                    case 7:
                        return 5
                    default:
                        if (word.length > 7) return 11;
                        else return 0;
                }
            default:
                switch (word.length) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        return 0;
                    case 4:
                        return 1;
                    case 5:
                        return 2;
                    case 6:
                        return 3;
                    case 7:
                        return 5
                    default:
                        if (word.length > 7) return 11;
                        else return 0;
                }
        }
    }

    static convertWordToArray(word) {
        const wordArr = [];
        for (let letter of word) {
            if (wordArr[wordArr.length - 1] === 'Q' && letter === 'U') {
                wordArr[wordArr.length - 1] += 'u';
            } else {
                wordArr.push(letter);
            }
        }
        return wordArr;
    }

    // CONSTRUCTOR

    constructor(code, dimension = 4) {
        super(code, {
            time_limit: 1000 * 60,
            game_name: 'Boggle',
            max_players: 24,
            min_players: 2
        });
        this.dimension = dimension;
        this.board = Boggle.createRandomBoard(dimension);
    }

    // GAME METHODS

    onAddPlayer(new_player) {
        new_player.words = new Set();
        new_player.points = 0;
    }

    update(player_name, { word }) {
        console.log('RECEIVED WORD');
        console.log(word);
        if (!word) console.log(arguments);
        const player = this.players.find(player => player.player_name === player_name);
        if (this.validate(word)) {
            console.log('VALID WORD');
            player.words.add(word);
            console.log([...player.words]);
        }
        console.log(this.players);
    }

    score() {
        this.status = 'scoring';
        const words = new Set();
        const duplicates = new Set();
        // create list of all words
        for (let player of this.players) {
            for (let word of player.words) {
                if (words.delete(word)) {
                    duplicates.add(word);
                } else if (!duplicates.has(word)) {
                    words.add(word);
                }
            }
        }
        console.log('FILTERED WORDS');
        console.log(words);
        console.log('DUPLICATE WORDS');
        console.log(duplicates);
        // first check if words are real
        return axios.post('https://boggle.thomaslowry.me/api/validate', JSONFriendly({ words }))
            .then(({ data: word_results }) => {
                console.log('WORD RESULTS');
                console.log(word_results.map(word => ({ value: word.value, defined: word.defined })));
                this.status = 'over';
                let valid_words = word_results.filter(({ defined }) => defined).map(({ value }) => value);
                for (let player of this.players) {
                    for (let word of player.words) {
                        if (valid_words.includes(word)) {
                            player.points += Boggle.scoreWord(word, this.dimension);
                        }
                    }
                }
                this.players.sort((one, two) => one.points < two.points);
                let winner = this.players[0];
                if (winner) {
                    winner.winner = true;
                }
                console.log('FINISHED SCORING');
                console.log(JSON.stringify(JSONFriendly(this), null, 4));
            })
            .catch(err => {
                console.log('SCORING ERROR');
                console.error(err);
            });
    }

    // BOGGLE METHODS

    validate(word) {
        console.log('VALIDATING WORD');
        console.log(word)
        word = Boggle.convertWordToArray(word);
        console.log(word);
        for (let y in this.board) {
            const row = this.board[y];
            for (let x in row) {
                const letterObj = row[x];
                if (
                    letterObj.letter === word[0]
                    &&
                    this.createWord(word, letterObj)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    createWord(word, currentLetterObj, currentPath = new Set()) {
        console.log('CREATING WORD: ' + word.join(''));
        currentPath.add(currentLetterObj);
        console.log(currentPath);
        if (currentPath.size === word.length) {
            return true;
        }
        else {
            let nextLetter = word[currentPath.size];
            let { x, y } = currentLetterObj;
            let adjacentLetters = [
                this.board[y][x - 1],
                this.board[y][x + 1],
            ];
            if (this.board[y - 1]) {
                adjacentLetters.push(
                    this.board[y - 1][x - 1],
                    this.board[y - 1][x],
                    this.board[y - 1][x + 1],
                );
            }
            if (this.board[y + 1]) {
                adjacentLetters.push(
                    this.board[y + 1][x - 1],
                    this.board[y + 1][x],
                    this.board[y + 1][x + 1],
                );
            }
            console.log('ADJACENT LETTERS TO x: ' + x + ' y: ' + y);
            console.log(adjacentLetters);
            for (let nextLetterObj of adjacentLetters) {
                if (
                    nextLetterObj
                    &&
                    nextLetterObj.letter === nextLetter
                    && !console.log(nextLetterObj.letter)
                    &&
                    !currentPath.has(nextLetterObj)
                    &&
                    this.createWord(word, nextLetterObj, new Set(currentPath))
                ) {
                    return true;
                }
            }
        }
        return false;
    }

}
