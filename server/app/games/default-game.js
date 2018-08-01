module.exports = class DefaultGame {

    constructor(code) {
        this.players = [];
        this.game_name = 'Default';
        this.game_code = code;
        this.current_path = '/wait/Default';
    }

    addPlayer(player_name) {
        if (this.players.some(player => player.name === player_name)) {
            throw new Error(`player name: ${player_name} already exists`);
        }
        this.players.push({
            player_name
        });
    }

    removePlayer(player_name) {
        this.players.splice(this.players.findIndex(player => player.player_name === player_name), 1);
    }

    start() {
        this.current_path = '/game/Default';
    }

}