module.exports = class GameTracker {
    
    constructor(GAMES, IO) {
        this.current_code = [65, 65, 65, 64];
        this.games = GAMES;
        this.current_games = {};
        this.IO = IO;
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
        let game_code = this.generateCode();
        const badwords = [];
        while (badwords.includes(game_code)) game_code = this.generateCode();
        // find correct game class
        if (!this.games.hasOwnProperty(game_name)) throw new Error(`invalid game name: ${game_name}`);
        const game = new this.games[game_name](this.IO, game_code);
        // add player to game
        game.addPlayer(player_name);
        // add game to list
        this.current_games[game_code] = game;
        return game;
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
        if (!game.players.length) {
            delete this.current_games[game_code];
        }
        return game;
    }
    
    startNextGame(game_code, new_game_name) {
        // find correct game class
        if (!this.games.hasOwnProperty(new_game_name)) throw new Error(`invalid game name: ${new_game_name}`);
        const old_game = this.current_games[game_code];
        const { players } = old_game;
        const new_game = new this.games[new_game_name](this.IO, game_code);
        // add player to game
        players.forEach(player => {
            new_game.addPlayer(player.player_name);
        });
        // replace old game with new game
        this.current_games[game_code] = new_game;
        // add game to list
        return new_game;
    }
    
}