module.exports = class DefaultGame {

    constructor(code, options = {}) {
        this.players = [];
        this.game_code = code;
        this.game_name = options.game_name || 'Default';
        this.current_path = `/wait/${this.game_name}`;
        this.time_limit = options.time_limit;
        this.new_players_allowed = true;
        this.max_players = options.max_players || 10;
        this.min_players = options.min_players || 2;
    }

    addPlayer(player_name) {
        if (this.players.some(player => player.player_name === player_name)) {
            throw new Error(`player name: ${player_name} already exists`);
        }
        if (!this.new_players_allowed) {
            throw new Error('this game is closed');
        }
        let new_player = { player_name };
        this.players.push(new_player);
        if (this.players.length === this.max_players) {
            this.new_players_allowed = false;
        }
        if (this.onAddPlayer) {
            this.onAddPlayer(new_player);
        }
    }

    removePlayer(player_name) {
        let removed_player = this.players.splice(this.players.findIndex(player => player.player_name === player_name), 1);
        if (this.onRemovePlayer) {
            this.onRemovePlayer(removed_player);
        }
    }

    start() {
        if (this.addListeners) {
            this.addListeners();
        }
        if (!this.onStart) {
            this.current_path = `/game/${this.game_name}`;
            this.new_players_allowed = false;
        } else {
            this.onStart();
        }
    }

    end() {
        this.current_path = `/results/${this.game_name}`;
        this.new_players_allowed = true;
        if (this.score) {
            return this.score();
        } else {
            // random winner
            let i = ~~Math.random() * this.players.length;
            let winner = this.players[i];
            if (winner) {
                winner.winner = true;
            }
        }
    }

}