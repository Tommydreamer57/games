export default class Boggle {

    // STATICS

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

    constructor(board) {
        this.board = board;
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
            return currentPath;
        }
        else {
            let nextLetter = word[currentPath.length];
            let { x, y } = currentLetterObj;
            let adjacentLetters = [
                this.board[y - 1][x - 1],
                this.board[y - 1][x],
                this.board[y - 1][x + 1],
                this.board[y][x - 1],
                this.board[y][x + 1],
                this.board[y + 1][x - 1],
                this.board[y + 1][x],
                this.board[y + 1][x + 1],
            ];
            for (let nextLetterObj of adjacentLetters) {
                if (
                    nextLetterObj
                    &&
                    nextLetterObj.letter === nextLetter
                    &&
                    !currentPath.has(nextLetterObj)
                ) {
                    let finalPath = this.createWord(word, nextLetterObj, new Set(currentPath))
                    if (finalPath.length === word.length) {
                        return finalPath;
                    }
                }
            }
        }
        return currentPath;
    }
}
