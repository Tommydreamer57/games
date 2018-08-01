module.exports = class GameTracker {
    constructor(GAMES) {
        this.current_code = [65, 65, 65, 64];
        this.games = GAMES;
        this.current_games = {};
    }
    generateCode() {
        const A = 65;
        const Z = 90;
        this.current_code[3]++;
        if (this.current_code[3] > Z) {
            this.current_code[3] = A;
            this.current_code[2]++;
        }
        if (this.current_code[2] > Z) {
            this.current_code[2] = A;
            this.current_code[1]++;
        }
        if (this.current_code[1] > Z) {
            this.current_code[1] = A;
            this.current_code[0]++;
        }
        if (this.current_code[0] > Z) {
            this.current_code[0] = A;
        }
        return this.current_code.map(n => String.fromCharCode(n)).join('');
    }
    createGame(game_name, player_name) {
        const game_code = this.generateCode();
        // find correct game class
        if (!this.games.hasOwnProperty(game_name)) throw new Error(`invalid game name: ${game_name}`);
        const game = new this.games[game_name]();
        // add player to game
        game.addPlayer(player_name);
        // add game to list
        this.current_games[game_code] = game;
        return game_code;
    }
    joinGame(game_code, player_name) {
        // find correct game
        if (!this.current_games.hasOwnProperty(game_code)) throw new Error(`invalid game code: ${game_code}`);
        const game = this.current_games[game_code];
        // add player to game
        game.addPlayer(player_name);
        return game;
    }
    leaveGame(game_code, player_name) {
        // find correct game
        if (!this.current_games.hasOwnProperty(game_code)) throw new Error(`invalid game code: ${game_code}`);
        const game = this.current_games[game_code];
        game.removePlayer(player_name);
    }
    endGame(game_code) {
        
        // delete this.current_games[game_code];
    }
}