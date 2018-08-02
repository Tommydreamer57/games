const Default = require('./default-game');

module.exports = class Boggle extends Default {
    
    constructor(IO, code) {
        super(IO, code, {
            time_limit: 1000 * 60 * 3,
            game_name: 'Boggle'
        });
        // this.board = createRandomBoard();
    }

    onAddPlayer(new_player) {
        new_player.words = [];
    }

    onScore() {
        // scoring functionality
    }

}
