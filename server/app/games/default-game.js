module.exports = class DefaultGame {
    constructor() {
        this.players = [];
        this.name = 'Default';
    }
    addPlayer(player_name) {
        if (this.players.some(player => player.name === player_name)) {
            throw new Error(`player name: ${player_name} already exists`);
        }
        this.players.push({
            name: player_name
        });
    }
    removePlayer(player_name) {
        this.players.splice(this.players.findIndex(player => player.name === player_name), 1);
    }
}