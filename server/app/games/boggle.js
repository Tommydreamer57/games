const Default = require('./default-game');

module.exports = class Boggle extends Default {

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
                let letter = letters.splice(randomIndex, 1);
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
        return word;
    }

    // CONSTRUCTOR

    constructor(IO, code, dimension = 4) {
        super(IO, code, {
            time_limit: 1000 * 60 * 3,
            game_name: 'Boggle'
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
        const player = this.players.find(player => player.player_name === player_name);
        if (this.validate(word)) {
            player.words.add(word);
        }
    }

    onScore() {
        // scoring functionality
        this.players.forEach(player => {
            player.words.forEach(word => {
                if (this.players.every(otherPlayer => (
                    otherPlayer === player
                    ||
                    !otherPlayer.words.has(word)
                ))) {
                    player.points += Boggle.scoreWord(word, this.dimension);
                }
            });
        });
        this.players.sort((one, two) => one.points > two.points);
        this.players[0].winner = true;
    }

    // BOGGLE METHODS

    validate(word) {
        word = Boggle.convertWordToArray(word);
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
        currentPath.add(currentLetterObj);
        if (currentPath.length === word.length) {
            return true;
        }
        else {
            let nextLetter = word[currentPath.length];
            let { x, y } = currentLetterObj;
            let adjacentLetters = [
                board[y - 1][x - 1],
                board[y - 1][x],
                board[y - 1][x + 1],
                board[y][x - 1],
                board[y][x + 1],
                board[y + 1][x - 1],
                board[y + 1][x],
                board[y + 1][x + 1],
            ];
            for (let nextLetterObj of adjacentLetters) {
                if (
                    nextLetterObj
                    &&
                    nextLetterObj.letter === nextLetter
                    &&
                    !currentPath.has(nextLetterObj)
                    &&
                    this.createWord(word, nextLetterObj, currentPath)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

}
